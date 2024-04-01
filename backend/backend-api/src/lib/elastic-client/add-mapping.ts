import { client } from './client';

// Testing out informatioon
// mapping users arrays

export const addMapping = async (index: string, type: string, body: any) => {
    return (
        await client.indices.putMapping({
            index: '',
            body: '',
            type: ''
        })

        //     await client.indices.create({
        //         index: `users_${userId}`,
        //         body: {
        //             mappings: {
        //                 properties: {
        //                     name: { type: 'text' },
        //                     email: { type: 'keyword' },
        //                     status: { type: 'keyword' },
        //                     age: { type: 'integer' },
        //                 }
        //             }
        //         }
        //     });
    )
}