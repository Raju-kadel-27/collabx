const { pubClient, subClient, createShardedAdapter } = require('./common/redisConfig')
const io = require('socket.io')(5000);
const CHANNEL_NAME = 'chat';

let message = 'testmsg'

pubClient.on('error', (error) => {
  console.error('pubClient error:', error);
});

subClient.on('error', (error) => {
  console.error('subClient error:', error);
});

io.adapter(createShardedAdapter(pubClient, subClient));

io.on('connection', (socket) => {
  console.log('socket joined', socket.id);

  socket.join(CHANNEL_NAME);

  io.to(CHANNEL_NAME).emit('messageFromServerA', message);

  io.emit('messageFromServerA', message)
  // socket.broadcast('messageFromServerA', message)
  socket.broadcast.emit('messageFromServerA', message)

  socket.on('messageFromServerB', (message) => {
    console.log(`Received a message from Server B: ${message}`);
  });

  socket.on('chatMessage', (message) => {
    console.log({ message });
    io.to(CHANNEL_NAME).emit('messageFromServerA', message);
  });

  socket.on('disconnect', () => {
    socket.leave(CHANNEL_NAME);
  });

});

console.log('socket server started 5000');





