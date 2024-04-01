const Redis = require('ioredis');

const redisClient = new Redis.Cluster([
//   { host: 'redis-node-1', port: 7000 },
  { host: '127.0.0.1', port: 7004 },
  // Add more nodes as needed
]);

// Listen for the 'connect' event to confirm the initial connection
redisClient.on('connect', () => {
  console.log('Connected to Redis Cluster');
});

// Listen for the 'status' event to track changes in connection status
redisClient.on('status', (status) => {
  console.log(`Connection status: ${status}`);
});

// Listen for the 'close' event to detect when the connection is closed
redisClient.on('close', () => {
  console.log('Connection closed');
});

// Listen for the 'error' event to handle connection errors
redisClient.on('error', (err) => {
  console.error(`Redis Error: ${err}`);
});

// Wait for the 'ready' event before publishing the message
redisClient.on('ready', () => {
  console.log('Reached ready state');

  // Publish the message to the channel
//   redisClient.publish('channel_server_1', 'Hoping message in the cloud', (err, reply) => {
//     if (err) {
//       console.error(`Error publishing message: ${err}`);
//     } else {
//       console.log('Message sent successfully');
//     }

//     // Close the connection after publishing
//     redisClient.quit();
//   });

});
