//@ts-ignore
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    rabbitmqUrl: process.env.RABBITMQ_URL as string,
    exchangeName: process.env.EXCHANGE_NAME as string,
}