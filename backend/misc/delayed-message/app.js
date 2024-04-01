const amqplib = require('amqplib')
const DelayedQueuesManager = require('./delayedQueuesManager');

amqplib.connect('amqp://localhost:5672/').then(async (connection) => {

    const channel = await connection.createChannel();
    const DESTINATION_QUEUE = 'destinationQueue';

    await channel.assertQueue(DESTINATION_QUEUE);

    await channel.consume(DESTINATION_QUEUE, (msg) => {
        const data = JSON.parse(msg.content.toString());
        console.log('\nQueued at ', data.queuedAt);
        console.log('Received at ', new Date(), data.message);

        // This approach may be acceptable

        // Consider this is your backend api server.
        // Connected to rabbitmq server ( not expensive for backend server to have connection).
        // Now you have some routes in backend server, that asserts and publish delayed message to ampqlib.

        // One way to achieve is ( keep message in database at sent time only keeping flag ).
        // Redis-channel-name has the format of senderUserId-ReceiverUserId.
        // While publishing to rabbitmq channel, we'll append redis-channel-name along with sender-name in message part.
        // Any one of the websocket servers, consume the channel.
        // Now, socket will publish this message to redis-channel, all the sockets listening on that channel receive message
        // forward them to the client side... 

        // Basically we are handling the logic at the client side.
        // Now if clientUserId doesnot match with senderId of (message), receive the realtime message else not.


        channel.ack(msg);
    })

    const delayedQueues = new DelayedQueuesManager(channel);

    await delayedQueues.setupDelayedTopology([0.25, 0.45, 1]);

    delayedQueues.sendWithDelay(DESTINATION_QUEUE, { message: 'Hello world  1 min delay', queuedAt: new Date() }, 1);
    delayedQueues.sendWithDelay(DESTINATION_QUEUE, { message: 'Hello world  0.45 min delay', queuedAt: new Date() }, 0.45);
    delayedQueues.sendWithDelay(DESTINATION_QUEUE, { message: 'Hello world  0.45 simultaneously', queuedAt: new Date() }, 0.45);
    delayedQueues.sendWithDelay(DESTINATION_QUEUE, { message: 'Hello world  0.25 min delay', queuedAt: new Date() }, 0.25);

    await delayedQueues.setupDelayedTopology([0.15]);
    delayedQueues.sendWithDelay(DESTINATION_QUEUE, { message: 'Hello world 0.15 sec delay', queuedAt: new Date() }, 0.15);

    await delayedQueues.setupDelayedTopology([0.35]);
    delayedQueues.sendWithDelay(DESTINATION_QUEUE, { message: 'Happy Birthday Aryan...Wishing you the best happy birthday. ', queuedAt: new Date() }, 0.15);
})