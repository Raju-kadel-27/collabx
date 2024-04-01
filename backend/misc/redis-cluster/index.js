require('dotenv').config();
const express = require('express');
const buildRedisClient = require('./service/redisClient');

const app = express();
const port = process.env.PORT || 3000;
const redis = buildRedisClient();
// app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// const value = await redis.get(key);
// await redis.set(key, value);


subscribeToChannel('my_channel');

setTimeout(() => {
  publishMessage('my_channel', 'Hello, Redis Pub/Sub!');
}, 5000)

async function subscribeToChannel(channel) {

  if (!redis) {
    console.error('Failed to create Redis client.');
    return;
  }

  await redis.subscribe(channel, (err, count) => {
    if (err) {
      console.error(`Error subscribing to ${channel}:`, err);
      return;
    }
    console.log(`Subscribed to ${channel}.`);
  });

  redis.on('message', (receivedChannel, message) => {
    console.log(`Received message from ${receivedChannel}: ${message}`);
    // Handle the received message as needed
  });

  // Handle errors, close connections, etc.
  redis.on('error', (error) => {
    console.error('Redis Error:', error);
  });

  redis.on('end', () => {
    console.log('Redis client connection ended');
  });
}

async function publishMessage(channel, message) {

  if (!redis) {
    console.error('Failed to create Redis client.');
    return;
  }

  try {
    const result = await redis.publish(channel, message);
    console.log(`Message published to ${channel}: ${message}`);
    console.log(`Number of subscribers that received the message: ${result}`);
  } catch (error) {
    console.error('Error publishing message:', error);
  } finally {
    // redis.quit();
  }
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})