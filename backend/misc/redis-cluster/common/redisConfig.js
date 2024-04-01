const Redis = require('ioredis');
const { createShardedAdapter } = require('@socket.io/redis-adapter');

const startupNodes = [
    { port: 7000, host: 'redis-node-1' },
];

const pubClient = new Redis.Cluster(startupNodes);
const subClient = pubClient.duplicate();

module.exports = { pubClient, subClient, createShardedAdapter };
