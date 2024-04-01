// const amqp = require('amqplib');
// const { Client } = require('@elastic/elasticsearch');

// const rabbitMQUrl = 'amqp://localhost';
// const elasticsearchNode = 'http://localhost:9200';

// const client = new Client({ node: elasticsearchNode });

// async function startConsumer() {
//   try {
//     const connection = await amqp.connect(rabbitMQUrl);
//     const channel = await connection.createChannel();
//     const queueName = 'userIndexingQueue';

//     await channel.assertQueue(queueName, { durable: true });

//     console.log('Waiting for messages...');

//     channel.consume(queueName, async (msg) => {
//       try {
//         const userData = JSON.parse(msg.content.toString());

//         // Index user data in Elasticsearch
//         await createUserIndex(userData);

//         console.log('User data indexed:', userData);

//         // Acknowledge the message
//         channel.ack(msg);
//       } catch (error) {
//         console.error('Error processing message:', error.message);
//         // Reject the message (optional) to move it to a dead-letter queue
//         // channel.reject(msg, false);
//       }
//     });
//   } catch (error) {
//     console.error('Error starting consumer:', error.message);
//   }
// }

// // Function to create an index for the user and index user data

// async function createUserIndex(userData) {
//   try {
//     // Assuming 'status' and 'age' are additional fields in your user data
//     userData.status = 'active';
//     userData.age = Math.floor(Math.random() * 50) + 18; // Assign a random age between 18 and 68

//     const userId = generateUserId();

//     await client.indices.create({
//       index: `users_${userId}`,
//       body: {
//         mappings: {
//           properties: {
//             name: { type: 'text' },
//             email: { type: 'keyword' },
//             status: { type: 'keyword' },
//             age: { type: 'integer' },
//           }
//         }
//       }
//     });

//     await client.index({
//       index: `users_${userId}`,
//       body: userData
//     });

//     console.log(`User with ID ${userId} indexed successfully.`);
//   } catch (error) {
//     console.error('Error indexing user:', error.message);
//     // Handle the error, possibly log it, and decide on appropriate actions
//   }
// }

// // Helper function to generate a unique user ID
// function generateUserId() {
//   return Math.random().toString(36).substr(2, 9);
// }

// // Start the consumer
// startConsumer();
