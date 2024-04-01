const { pubClient, subClient, createShardedAdapter } = require('./common/redisConfig')
const io = require('socket.io')(5001);
const CHANNEL_NAME = 'chat';

let message = 'testmsg';

io.adapter(createShardedAdapter(pubClient, subClient));

io.on('connection', (socket) => {
    console.log('socketId', socket.id);
    socket.join(CHANNEL_NAME);

    socket.on('messageFromServerA', (message) => {
        console.log(`Received a message from Server A: ${message}`);
    });

    io.on('messageFromServerA', (message) => {
        console.log(`Received a message from Server A: ${message}`);
    });

    socket.on('chatMessage', (message) => {
        console.log('chatmessage', message)
        io.to(CHANNEL_NAME).emit('messageFromServerB', message);

    });

    socket.on('disconnect', () => {
        socket.leave(CHANNEL_NAME);
    });

});
console.log('socket server started 5001')

