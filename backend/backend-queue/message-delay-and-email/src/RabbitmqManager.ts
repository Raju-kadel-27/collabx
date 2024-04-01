import {
    connect,
    Options,
} from 'amqplib';
import { DelayedQueuesManager } from './DelayedQueueManager';
import { config } from './config';

export interface RabbitMQConfig {
    url: string;
    exchanges?: Array<{
        name: string,
        type: string,
        options?: Options.AssertExchange
    }>
}

interface Message {
    content: string;
    timestamp: number;
}

export class RabbitMQHandler {
    private connection: any;
    private channel: any

    constructor(private config: RabbitMQConfig) {
        this.connectToRabbitMQ();
    }
    private async connectToRabbitMQ() {
        const { url, exchanges } = this.config;
        try {
            this.connection = await connect(url);
            this.channel = await this.connection.createChannel();

            this.handleConnectionEvents();
            // Declare exchanges
            // if (exchanges) {
            //     console.log({ exchanges });
            //     await Promise.all(exchanges.map(exchange =>
            //         this.channel.assertExchange(exchange.name, exchange.type, exchange.options)
            //     ));
            // }
            console.log('Connected to RabbitMQ');
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
            throw error;
        }
    }

    private handleConnectionEvents() {
        this.connection.on('error', (err: any) => {
            console.error('RabbitMQ connection error:', err);
        });

        this.connection.on('close', () => {
            console.log('RabbitMQ connection closed');
        });
    }

    public async sendDelayMessage(message: string) {
        try {
            if (!this.channel) {
                throw new Error('Channel not available. Ensure the connection is established.');
            }
            const delayedQueues = new DelayedQueuesManager(this.channel, {
                delayExchangeName: 'delay-exchange',
                delayExchangeOptions: { durable: true, autoDelete: false },
                delayQueuePrefix: 'delay-queue',
                delayQueueOptions: { durable: true }
            });
            await delayedQueues.setupDelayedTopology([0.8, 0.99, 1]);
            delayedQueues.sendWithDelay(process.env.EXCHANGE_NAME,
                {
                    message: message,
                    queuedAt: new Date()
                }, 1);
            console.log('Delayed Message sent::: % ', message);
        } catch (error) {
            console.error('Error sending delay message:', error);
            throw error;
        }
    }

    public async sendMessage(exchange: string, routingKey: string, message: Message) {
        try {
            if (!this.channel) {
                throw new Error('Channel not available. Ensure the connection is established.');
            }
            await this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
            // await this.channel.publish(exchange, JSON.stringify(message));
            console.log('Message sent:', message);
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    public async consumeMessages(queue: string, callback: (message: Message) => void) {
        try {
            if (!this.channel) {
                throw new Error('Channel not available. Ensure the connection is established.');
            }
            await this.channel.assertQueue(queue);
            this.channel.prefetch(1);
            await this.channel.consume(queue, async (msg: any) => {
                if (msg) {
                    const message: Message = JSON.parse(msg.content.toString());
                    try {
                        callback(message);
                        this.channel.ack(msg);
                    } catch (processingError) {
                        console.error('Error processing message:', processingError);
                        // Handle the error, optionally reject or requeue the message
                        this.channel.nack(msg, false, false);
                    }
                }
            });
        } catch (error) {
            console.error('Error consuming messages:', error);
            throw error;
        }
    }

    public async closeConnection() {
        try {
            // Close the channel and connection
            if (this.channel) {
                await this.channel.close();
                console.log('Channel closed');
            }
            if (this.connection) {
                await this.connection.close();
                console.log('Connection closed');
            }
        } catch (error) {
            console.error('Error closing connection:', error);
            throw error;
        }
    }
}
