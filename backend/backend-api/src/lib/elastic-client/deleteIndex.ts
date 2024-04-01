import { client } from './client';

export const deleteIndex = async (indexId: string) => {
    return await client.indices.delete({ index: indexId })
}