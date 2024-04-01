const Redis = require('ioredis');
const http = require('http');
const socketIo = require('socket.io');

// const redisClient = new Redis.Cluster([
//   { host: 'redis-node-1', port: 6379 },
//   { host: 'redis-node-2', port: 6379 },
//   // Add more nodes as needed
// ]);

//sending message info
const server = http.createServer();
const io = socketIo(server, { path: '/socket-server-1' });

const subscribeToChannel = (io, channel) => {
  console.log('sebscriber entry')
  const subscriber = new Redis.Cluster([
    { host: 'localhost', port: 7000 },
    // Add more nodes as needed
  ]);

  subscriber.subscribe(channel);

  subscriber.on('message', (subChannel, message) => {
    console.log(`Received message on channel ${subChannel}: ${message}`);
    io.emit('message', message);
  });

  subscriber.on('error', (err) => {
    console.error(`Redis Error: ${err}`);
  });

  process.on('exit', () => {
    subscriber.quit();
  });
};

subscribeToChannel(io, 'channel_server_1');

io.on('connection', (socket) => {
  console.log('Socket connected to /socket-server-1');
  socket.on('message', (message) => {
    console.log(`Received message from client: ${message}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});
