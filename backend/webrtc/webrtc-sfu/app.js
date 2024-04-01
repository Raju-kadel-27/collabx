const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const port = 5001
const mediasoup = require('mediasoup')
const dotenv = require("dotenv");
const { SFU__ACTIONS: ACTIONS } = require('./actions')
// const connectDB = require("./config/db");
// const spawn = require('child_process').spawn;
// const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// ffmpeg.setFfmpegPath(ffmpegPath);

app.use(cors())
dotenv.config();
// connectDB()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const mediaCodecs = [
    {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
    },
    {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
            'x-google-start-bitrate': 1000,
        },
    },
]


/**
 * Worker
 * |-> Router(s)
 *     |-> Producer Transport(s)
 *         |-> Producer
 *     |-> Consumer Transport(s)
 *         |-> Consumer 
 **/

// let worker
// let rooms = {}          // { roomName1: { Router, rooms: [ socketId1, ... ] }, ...}
// let peers = {}          // { socketId1: { roomName1, socket, transports = [id1, id2,] }, producers = [id1, id2,] }, consumers = [id1, id2,], peerDetails }, ...}
// let transports = []     // [ { socketId1, roomName1, transport, consumer }, ... ]
// let producers = []      // [ { socketId1, roomName1, producer, }, ... ]
// let consumers = []      // [ { socketId1, roomName1, consumer, }, ... ]

// global variables for sfu server
let worker;
let rooms = {}
let peers = {}
let transports = []
let producers = []
let consumers = []
let dataProducers = []
let dataConsumers = []

// some state of peers joined
const socketUserMap = {}
const clientUsersMap = {}
const onlineUsers = new Set();
// const socketEditorsMap = {};


const createWorker = async () => {
    worker = await mediasoup.createWorker({
        rtcMinPort: 2000,
        rtcMaxPort: 2100
    })
    worker.on(ACTIONS.WORKER__DIED, error => {
        setTimeout(() => process.exit(1), 2000)
    })

    worker.on('listen', () => {
        return console.log('PID working on socket 23')
    })
    

    return worker;
}

const createRoom = async (roomName, socketId) => {
    let router1;
    let peers = [];
    if (rooms[roomName]) {
        router1 = rooms[roomName].router;
        peers = rooms[roomName].peers || [];

    } else {
        router1 = await worker.createRouter({ mediaCodecs })
    }
    rooms[roomName] = {
        router: router1,
        peers: [...peers, socketId]
    }
    return router1
}

//
const createWebRtcTransport = async (router) => {
    const webRtcTransport_options = {
        listenIps: [
            {
                ip: '0.0.0.0',
                announcedIp: '127.0.0.1'
            }
        ],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
        enableSctp: true, // Enable SCTP for data channels
        numSctpStreams: {
            OS: 1024, // Outbound stream count
            MIS: 1024, // Max inbound stream count
        },

    }
    let transport = await router.createWebRtcTransport(webRtcTransport_options)
    transport.on(ACTIONS.DTLS__STATE__CHANGE, dtlsState => {
        if (dtlsState === ACTIONS.CLOSED) {
            transport.close()
        }
    })

    transport.on(ACTIONS.CLOSE, () => {
        console.log('transport closed')
    })
    return transport
}
//
const addTransport = (transport, roomName, consumer, socketId) => {
    transports = [
        ...transports,
        { socketId: socketId, transport, roomName, consumer }
    ]
    peers[socketId] = {
        ...peers[socketId],
        transports: [
            ...peers[socketId].transports,
            transport.id
        ]
    }
}
//
const getTransport = (socketId) => {
    const [producerTransport] = transports.filter(transport =>
        transport.socketId === socketId && !transport.consumer)
    return producerTransport.transport
}
//
const addDataProducer = (producer, roomName, socketId) => {
    console.log('add-data-producer-called-check-below')
    console.log({ roomName, socketId });

    dataProducers = [
        ...dataProducers,
        { socketId: socketId, producer, roomName }
    ]

    console.log('peers-dataproducers---->> ', peers[socketId].dataProducers);
    if (!peers[socketId].dataProducers) {
        peers[socketId].dataProducers = []
    }

    peers[socketId] = {
        ...peers[socketId],
        dataProducers: [
            ...peers[socketId].dataProducers,
            producer.id
        ]
    }

    console.log('peers-dataproducers---->> ', peers[socketId].dataProducers);

}
const addProducer = (producer, roomName, socketId) => {
    console.log('add-producer-called')

    producers = [
        ...producers,
        { socketId: socketId, producer, roomName }
    ]
    peers[socketId] = {
        ...peers[socketId],
        producers: [
            ...peers[socketId].producers,
            producer.id
        ]
    }
}

//
const addDataConsumer = (consumer, roomName, socketId) => {
    console.log('addDataConsumer called');
    console.log(consumer.id, { roomName })
    dataConsumers = [
        ...consumers,
        { socketId: socketId, consumer, roomName }
    ]

    if (!peers[socketId].dataConsumers) {
        peers[socketId].dataConsumers = []
    }

    peers[socketId] = {
        ...peers[socketId],
        dataConsumers: [
            ...peers[socketId].dataConsumers,
            consumer.id
        ]
    }

    console.log('peers[socketId]', peers[socketId])
};



const addConsumer = (consumer, roomName, socketId) => {
    console.log('addConsumer called')
    consumers = [
        ...consumers,
        { socketId: socketId, consumer, roomName }
    ]

    peers[socketId] = {
        ...peers[socketId],
        consumers: [
            ...peers[socketId].consumers,
            consumer.id
        ]
    }
}

const informConsumers = (roomName, socket, socketId, producerId, clientDetails) => {
    producers.forEach(producerData => {
        if (producerData.socketId !== socketId && producerData.roomName === roomName) {
            const producerSocket = peers[producerData.socketId].socket
            producerSocket.emit(ACTIONS.NEW__PRODUCER, { producerId, clientDetails })
        }
    })
}

const informDataConsumers = (roomName, socket, socketId, producerId, clientDetails) => {
    console.log('informDataConsumers called %%%%%%%%%%%%%%%%%%%%%')
    console.log({ roomName, socket, socketId, producerId, clientDetails })
    dataProducers.forEach(producerData => {
        if (producerData.socketId !== socketId && producerData.roomName === roomName) {
            const producerSocket = peers[producerData.socketId].socket
            console.log({ producerSocket })
            producerSocket.emit('newDataProducer', { producerId, clientDetails })
        }
    })
}




const removePeer = (items, socketId, type) => {
    items.forEach(item => {
        if (item.socketId === socketId) {
            item[type].close()
        }
    })
    items = items.filter(item => item.socketId !== socketId);
    return items
}

// Maintaining one worker is fine 
// since we are going to deploy it in k8s (pods having 1 cpu core)
worker = createWorker()

io.on('connection', (socket) => {
    console.log("New Connection", socket.id)

    socket.emit(ACTIONS.CONNECTION__SUCCESS, {
        socketId: socket.id
    })

    socket.on(
        ACTIONS.REGISTER__ONLINE__USER,
        ({ userId }) => {
            clientUsersMap[userId] = socket.id
            onlineUsers.add(userId);
            io.emit(
                ACTIONS.GET__ONLINE__USER,
                { onlineUsers: Array.from(onlineUsers) }
            );
        })

    socket.on(
        ACTIONS.GET__ONLINE__USER,
        () => {
            socket.emit(ACTIONS.GET__ONLINE__USER, { onlineUsers: Array.from(onlineUsers) })
        })

    socket.on(ACTIONS.CREATE__RINGING__FOR__DUAL, ({ receiverId, caller }) => {
        const receiverSocketId = clientUsersMap[receiverId]
        io.to(receiverSocketId).emit(ACTIONS.CREATE__RINGING__FOR__DUAL, { caller, roomId: 112233 })
    })

    socket.on(ACTIONS.JOIN_FOR_SOCKET_USER_MAP, ({ roomId, userDetails }) => {
        socketUserMap[socket.id] = userDetails;
        console.log('socket user mapped ', socketUserMap)
    })

    socket.on(ACTIONS.JOIN, async ({ roomName }, callback) => {
        const router1 = await createRoom(roomName, socket.id)
        peers[socket.id] = {
            socket,
            roomName,
            transports: [],
            producers: [],
            consumers: [],
            peerDetails: {
                name: '',
                isAdmin: false
            }
        }
        const rtpCapabilities = router1.rtpCapabilities
        callback({ rtpCapabilities })
    })

    socket.on(ACTIONS.CREATE__WEBRTC__TRANSPORT, async ({ consumer }, callback) => {
        const roomName = peers[socket.id].roomName;
        const router = rooms[roomName].router;
        try {

            // {
            //     id             : "152f60cd-10ac-443b-8529-6474ecba2e44",
            //     iceParameters  : { ... },
            //     iceCandidates  : [ ... ],
            //     dtlsParameters : { ... },
            //     sctpParameters : { ... }
            //   }

            const transport = await createWebRtcTransport(router)

            callback({
                params: {
                    id: transport.id,
                    iceParameters: transport.iceParameters,
                    iceCandidates: transport.iceCandidates,
                    dtlsParameters: transport.dtlsParameters,
                    sctpParameters: transport.sctpParameters
                }
            })

            addTransport(transport, roomName, consumer, socket.id)

        } catch (error) {
            console.log({ error })
            callback({
                params: {
                    error: error
                }
            })
        }
    })

    socket.on(ACTIONS.TRANSPORT__CONNECT, ({ dtlsParameters }) => {
        getTransport(socket.id).connect({ dtlsParameters })

    })

    socket.on(ACTIONS.TRANSPORT__PRODUCE, async ({ kind, rtpParameters, appData }, callback) => {

        const producer = await getTransport(socket.id).produce({
            kind,
            rtpParameters
        })

        const { roomName } = peers[socket.id];
        const clientDetails = socketUserMap[socket.id]
        addProducer(producer, roomName, socket.id);
        informConsumers(roomName, socket, socket.id, producer.id, clientDetails);
        producer.on(ACTIONS.TRANSPORT__CLOSE, () => {
            producer.close()
        })
        callback({
            id: producer.id,
            producersExists: producers.length > 1 ? true : false
        })
    })


    socket.on('transportProduceData', async (
        {
            transportId,
            sctpStreamParameters,
            label,
            protocol
        }
        , callback) => {

        console.log('transportProduceData %% called');
        const dataProducer = await getTransport(socket.id).produceData({
            sctpStreamParameters,
            label,
            //    protocol
        })

        const { roomName } = peers[socket.id];
        const clientDetails = socketUserMap[socket.id]

        addDataProducer(dataProducer, roomName, socket.id);

        informDataConsumers(roomName, socket, socket.id, dataProducer.id, clientDetails);

        dataProducer.on(ACTIONS.TRANSPORT__CLOSE, () => {
            dataProducer.close()
        })
        callback({
            id: dataProducer.id,
            dataProducersExists: dataProducers.length > 1 ? true : false
        })
    })






    // socket.on(ACTIONS.REMOVE__PREVIOUS__PRODUCER, () => {
    //     console.log('remove-producer-toggle-closed')
    //     socket.emit(ACTIONS.)
    //     producers = removePeer(producers, socket.id, 'producer')
    // })

    socket.on(
        ACTIONS.TRANSPORT__RECV__CONNECT,
        async (
            { dtlsParameters,
                serverConsumerTransportId
            }
        ) => {
            const consumerTransport = transports.find(transportData => (
                transportData.consumer && transportData.transport.id === serverConsumerTransportId
            )).transport

            await consumerTransport.connect({ dtlsParameters })

        })









    /* *********************************** */
    socket.on(
        'consumeData',
        async (
            {
                sctpStreamParameters,
                remoteProducerId,
                remoteClientDetails,
                serverConsumerTransportId
            },
            callback
        ) => {

            try {

                const { roomName } = peers[socket.id];
                // const router = rooms[roomName].router;

                let consumerTransport = transports.find(transportData => (
                    transportData.consumer && transportData.transport.id == serverConsumerTransportId
                )).transport

                // transport.consumeData()
                const dataConsumer =
                    await consumerTransport
                        .consumeData({
                            dataProducerId: remoteProducerId,
                            // sctpStreamParameters,
                            // paused: true
                        });

                dataConsumer.on(ACTIONS.TRANSPORT__CLOSE, () => {
                    console.log('%%%%Transport close called now...')
                })

                dataConsumer.on(ACTIONS.PRODUCER__CLOSE, () => {
                    console.log('%%%%Producer close called now...')

                    socket.emit('dataProducerClosed',
                        {
                            remoteClientDetails,
                            remoteProducerId
                        })

                    consumerTransport.close([]);

                    transports = transports.filter(transportData => transportData.transport.id !== consumerTransport.id);
                    dataConsumer.close();
                    dataConsumers = dataConsumers.filter(consumerData => consumerData.consumer.id !== dataConsumer.id);
                })

                addDataConsumer(dataConsumer, roomName, socket.id);

                const params = {
                    id: dataConsumer.id,
                    producerId: remoteProducerId,
                    sctpStreamParameters: dataConsumer.sctpStreamParameters,
                    label: dataConsumer.label,
                    protocol: dataConsumer.protocol
                }

                // const params = {
                //     id: dataConsumer.id,
                //     producerId: remoteProducerId,
                //     kind: dataConsumer.kind,
                //     rtpParameters: dataConsumer.rtpParameters,
                //     serverConsumerId: dataConsumer.id
                // }
                callback({ params })

            }
            catch (error) {
                console.log(error)
                callback({
                    params: {
                        error: error
                    }
                })
            }
        })

    //* *********************************** */


    socket.on(
        ACTIONS.CONSUME,
        async (
            {
                rtpCapabilities,
                remoteProducerId,
                remoteClientDetails,
                serverConsumerTransportId
            },
            callback
        ) => {

            try {
                const { roomName } = peers[socket.id];
                const router = rooms[roomName].router;

                let consumerTransport = transports.find(transportData => (
                    transportData.consumer && transportData.transport.id == serverConsumerTransportId
                )).transport

                if (router.canConsume({
                    producerId: remoteProducerId,
                    rtpCapabilities
                })) {

                    const consumer =
                        await consumerTransport
                            .consume({
                                producerId: remoteProducerId,
                                rtpCapabilities,
                                paused: true
                            })

                    consumer.on(ACTIONS.TRANSPORT__CLOSE, () => {
                        console.log('%%%%Transport close called now...')
                    })
                    consumer.on(ACTIONS.PRODUCER__CLOSE, () => {
                        console.log('%%%%Producer close called now...')

                        socket.emit(ACTIONS.PRODUCER__CLOSED,
                            {
                                remoteClientDetails,
                                remoteProducerId
                            })

                        consumerTransport.close([])

                        transports = transports.filter(transportData => transportData.transport.id !== consumerTransport.id)
                        consumer.close()
                        consumers = consumers.filter(consumerData => consumerData.consumer.id !== consumer.id)
                    })
                    addConsumer(consumer, roomName, socket.id)
                    const params = {
                        id: consumer.id,
                        producerId: remoteProducerId,
                        kind: consumer.kind,
                        rtpParameters: consumer.rtpParameters,
                        serverConsumerId: consumer.id
                    }
                    callback({ params })
                }
            } catch (error) {
                console.log(error)
                callback({
                    params: {
                        error: error
                    }
                })
            }

        })






    socket.on(ACTIONS.CONSUMER__RESUME, async ({ serverConsumerId }) => {

        const { consumer } =
            consumers
                .find(consumerData =>
                    consumerData.consumer.id === serverConsumerId)

        await consumer.resume()
    })

    socket.on(ACTIONS.GET__PRODUCERS, callback => {

        const { roomName } = peers[socket.id]
        let producerList = []
        let producerListWithClientDetails = {}
        producers.forEach(producerData => {
            if (
                producerData.socketId !== socket.id
                &&
                producerData.roomName === roomName
            ) {
                producerList = [...producerList, producerData.producer.id]
                producerListWithClientDetails[producerData.producer.id] = socketUserMap[producerData.socketId]

            }
        })
        callback({ producerIds: producerList, producerListWithClientDetails })
    })


    socket.on('getDataProducers', callback => {

        const { roomName } = peers[socket.id]
        let producerList = []
        let producerListWithClientDetails = {}
        dataProducers.forEach(producerData => {
            if (
                producerData.socketId !== socket.id
                &&
                producerData.roomName === roomName
            ) {
                producerList = [...producerList, producerData.producer.id]
                producerListWithClientDetails[producerData.producer.id] = socketUserMap[producerData.socketId]
            }
        })

        callback({ producerIds: producerList, producerListWithClientDetails })
    })



    socket.on(ACTIONS.DISCONNECT, () => {
        consumers = removePeer(consumers, socket.id, 'consumer')
        producers = removePeer(producers, socket.id, 'producer')
        transports = removePeer(transports, socket.id, 'transport')

        let roomName = peers[socket.id]?.roomName

        // const { roomName } = peers[socket.id]
        delete peers[socket.id]
        if (roomName) {
            rooms[roomName] = {
                router: rooms[roomName].router,
                peers: rooms[roomName].peers
                    .filter(socketId => socketId !== socket.id)
            }
        }
    })



    socket.on(ACTIONS.REMOVE__PREVIOUS__PRODUCER, ({ userDetails }) => {
        const { roomName } = peers[socket.id];
        producers.forEach(producerData => {
            if (
                producerData.socketId !== socket.id
                && producerData.roomName === roomName) {
                const producerSocket = peers[producerData.socketId].socket
                producerSocket.emit(ACTIONS.HOLD__CLIENT, { userDetails })
            }
        })
        producers = removePeer(producers, socket.id, 'producer')
    })

})

//server listening on port 8899
server.listen(port, () => {
    console.log(`SFU app listening on port ${port}`);
})