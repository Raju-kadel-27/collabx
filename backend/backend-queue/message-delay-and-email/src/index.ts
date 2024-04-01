import { RabbitMQHandler, RabbitMQConfig } from './RabbitmqManager';
import { config } from './config';
//@ts-ignore
import winston from 'winston';

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});
(async () => {
    try {
        const rabbitMQConfig: RabbitMQConfig = {
            url: config.rabbitmqUrl,
            exchanges: [{ name: config.exchangeName, type: 'fanout' }],
        };
        console.log({ rabbitMQConfig })
        const rabbitMQHandler = await new RabbitMQHandler(rabbitMQConfig);
        console.log({ rabbitMQHandler })
        setTimeout(async () => {
            await rabbitMQHandler.sendMessage(config.exchangeName, '', {
                content: 'Hello, RabbitMQ!',
                timestamp: Date.now(),
            })
            await rabbitMQHandler.sendDelayMessage(JSON.stringify({
                content: 'This is delayed__message. Happy birthday darling !!',
                timestamp: Date.now()
            }))
            rabbitMQHandler.consumeMessages(config.exchangeName, (message) => {
                console.log('###############################');
                console.log('Received message:', { message });
                console.log('###############################');
            });
        }, 3000)

        const handleShutdown = async () => {
            logger.info('Received shutdown signal. Closing RabbitMQ connection...');
            await rabbitMQHandler.closeConnection();
            process.exit(0);
        };
        process.on('SIGINT', handleShutdown);
        process.on('SIGTERM', handleShutdown);
        // Close the connection after a delay
        // setTimeout(async () => {
        //     await handleShutdown();
        // }, 5000);
    } catch (error) {
        logger.error(`Error during application startup: ${error}`);
        process.exit(1);
    }
})();
