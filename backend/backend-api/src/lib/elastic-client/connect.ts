import config from '../../config';
import { client } from './client'

const sleep = (ms: number) => new Promise((res: any) => setTimeout(() => res(), ms));

let tries = config.elasticSearchRetriesCount;

export const connect = async () => {
    while (tries) {
        try {
            await client.ping();
            console.log('Client is connected');
            return client;
        } catch (error) {
            console.log({ error });
        }
        console.log('Couldnot connect to the client');
        tries -= 1;
        // sleep for 30 seconds
        await sleep(30000);
    }

    throw new Error('Timeout occured for retry.');
}