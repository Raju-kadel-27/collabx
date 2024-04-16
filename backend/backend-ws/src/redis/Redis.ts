import type { RedisClientType } from 'redis';
import { createClient } from "redis";

import { REDIS_URL, NOTIFICATION_QUEUE } from "../config"

export class Redis {
    private client: RedisClientType;
    private static instance: Redis;

    constructor() {
        this.client = createClient({
            url: REDIS_URL
        });

        this.client.connect();
    }

    public static getInstance(): Redis {
        if (!this.instance) {
            this.instance = new Redis();
        }
        return this.instance;
    }
    
    async send(message: string) {
        await this.client.rPush(NOTIFICATION_QUEUE, message);
    }

    async delaySend(message: string) {
        //code to add
        await this.client.rPush(NOTIFICATION_QUEUE, message);
    }
}









