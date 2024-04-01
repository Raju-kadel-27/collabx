const { pubClient, subClient, redisAdapter } = require('./common/redisConfig');
const io = require('socket.io')(6000);
const CHANNEL_NAME = 'chat';

io.adapter(redisAdapter(pubClient, subClient));
// io.adapter(createAdapter(pubClient, subClient));


io.on('connection', (socket) => {

    socket.join(CHANNEL_NAME);

    socket.on('chatMessage', (message) => {
        console.log(message)
        io.emit('chatMessage','xxx')
        io.to(CHANNEL_NAME).emit('chatMessage', message);
    });


    socket.on('disconnect', () => {
        socket.leave(CHANNEL_NAME);
    });

});

console.log('socket server started')