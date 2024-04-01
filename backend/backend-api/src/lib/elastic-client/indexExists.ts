import { client } from './client';

export const indexExists = async (indexId: string) => {
    return await client.indices.exists({ index: indexId })
}