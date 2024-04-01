// async function createUserIndex(userData) {
//     const userId = generateUserId();

//     userData.status = 'active';

//     userData.age = Math.floor(Math.random() * 50) + 18; // Assign a random age between 18 and 68

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

//     await client.index({
//         index: `users_${userId}`,
//         body: userData
//     });

//     console.log(`User with ID ${userId} indexed successfully.`);
// }

const client = require("./client");
const isIndexExist = require("./isIndexExist");
const addMapping = require("./addMapping")


const createIndex = async (ind, ty, mapping) => {
    try {
        const exists = await isIndexExist(ind)
        if (!exists) {
            console.log(`Creating index ${ind}...`)
            await client.indices.create({ index: ind })
            mapping && await addMapping(ind, ty, mapping)
        }
        else {
            console.log(`Index ${ind} exists`)
        }
    } catch (err) {
        console.log(`Unable to create index index ${ind}...`, err)
    }
}


module.exports = createIndex;
