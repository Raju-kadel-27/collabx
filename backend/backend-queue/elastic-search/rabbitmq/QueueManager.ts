import amqplib from 'amqplib';
import type { Channel, Connection } from 'amqplib';
import config from '../configs';
import { ElasticManager } from '../elastic-client/ElasticManger';
import { logger } from '../logger';

export class QueueManager {

    private connection: Connection;
    private channel: Channel;
    private static instance: QueueManager;

    constructor() {
        this.connectAmqplib()
    }

    async connectAmqplib() {
        this.connection = await amqplib.connect(config.amqlibURL);
        this.channel = await this.connection.createChannel();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new QueueManager()
            console.log('Initializing instance for first time')
        }
        console.log('Queue manger has instance that is already created')

        return this.instance;
    }

    async registerQueue(queueName: string) {
        try {

            await this.channel.assertQueue(queueName, { durable: true })

        } catch (error) {
            console.log({ error });
        }

    }

    async consumeChannel(queueName: string) {

        this.channel.consume(queueName, async (msg: any) => {
            try {
                if (msg && queueName) {

                    const userData = JSON.parse(msg.content.toString());

                    await ElasticManager.getInstance().indexDocument(config.indexName, userData);

                    logger.info(`User data has been indexed: ${userData}`);

                    this.channel.ack(msg);
                }
            } catch (error) {
                console.error('Error processing message:', error);
                // Reject the message (optional) to move it to a dead-letter queue
                this.channel.reject(msg, false);
            }
        })
    }

    async closeConnection(): Promise<void> {
        try {
            if (this.connection) {

                await this.connection.close();

                console.log('Connection to RabbitMQ closed');

            }
        } catch (error: any) {
            console.error('Error closing connection to RabbitMQ:', error.message);
            throw error;
        }
    }

}