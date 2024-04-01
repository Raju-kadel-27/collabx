const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const port = 5002
const PROCESS_NAME = 'FFmpeg';
const mediasoup = require('mediasoup')

// const connectDB = require("./config/db");
const dotenv = require("dotenv");
const { SFU__ACTIONS: ACTIONS } = require('./actions')
// const GStreamer = require('./gstreamer')
const FFmpeg = require('./ffmpeg')
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
});

let mediaCodecs = [
    {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2
    },
    {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
            'x-google-start-bitrate': 1000
        }
    },
    {
        kind: 'video',
        mimeType: 'video/VP9',
        clockRate: 90000,
        parameters: {
            'profile-id': 2,
            'x-google-start-bitrate': 1000
        }
    },
    {
        kind: 'video',
        mimeType: 'video/H264',
        clockRate: 90000,
        parameters: {
            'packetization-mode': 1,
            'profile-level-id': '42e01f',
            'level-asymmetry-allowed': 1,
            'x-google-start-bitrate': 1000
        }
    },
];

// const mediaCodecs = [
//     {
//         kind: 'audio',
//         mimeType: 'audio/opus',
//         clockRate: 48000,
//         channels: 2,
//     },
//     {
//         kind: 'video',
//         mimeType: 'video/VP8',
//         clockRate: 90000,
//         parameters: {
//             'x-google-start-bitrate': 1000,
//         },
//     },
// ]


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
let rooms = {};
let peers = {};
let transports = [];
let producers = [];
let consumers = [];

// some state of peers joined
const socketUserMap = {};
const clientUsersMap = {};
const onlineUsers = new Set();
const socketEditorsMap = {};


const createWorker = async () => {
    worker = await mediasoup.createWorker({
        rtcMinPort: 2000,
        rtcMaxPort: 2100
    })
    worker.on(ACTIONS.WORKER__DIED, error => {
        setTimeout(() => process.exit(1), 2000)
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
                announcedIp: '192.168.0.100'
            }
        ],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
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

const getTransport = (socketId) => {
    const [producerTransport] = transports.filter(transport =>
        transport.socketId === socketId && !transport.consumer)
    return producerTransport.transport
}

const addTransport = (transport, roomName, socketId) => {
    transports = [
        ...transports,
        { socketId: socketId, transport, roomName, }
    ]
    peers[socketId] = {
        ...peers[socketId],
        transports: [
            ...peers[socketId].transports,
            transport.id
        ]
    }
}

const addProducer = (producer, roomName, socketId) => {
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
            const transport = await createWebRtcTransport(router)
            callback({
                params: {
                    id: transport.id,
                    iceParameters: transport.iceParameters,
                    iceCandidates: transport.iceCandidates,
                    dtlsParameters: transport.dtlsParameters
                }
            })

            addTransport(transport, roomName, socket.id)

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
        console.log('process started1')

        const { roomName } = peers[socket.id];
        console.log('process started2')

        addProducer(producer, roomName, socket.id);
        producer.on(ACTIONS.TRANSPORT__CLOSE, () => {
            producer.close()
        })
        console.log('process started3')

        callback({
            id: producer.id,
            producersExists: producers.length > 1 ? true : false
        })
        console.log('process started4')


        if (producers.length === 2) {

            // start code for ffmpeg
            let recordInfo = {};
            // console.log({ producers }, 'check before foreach')

            producers.forEach(async (producerData) => {
                if (producerData.socketId === socket.id && producerData.roomName === roomName) {
                    const producerKind = producerData.producer['kind']
                    recordInfo[producerKind] = await publishProducerRtpStream(roomName, socket.id, producerData.producer);
                    console.log(recordInfo[producerKind], 'below producers.for each')
                }
            })


            const producerPromises = producers
                .filter(producerData => producerData.socketId === socket.id && producerData.roomName === roomName)
                .map(async producerData => {
                    const producerKind = producerData.producer.kind;
                    console.log({ producerKind })
                    return recordInfo[producerKind] = await publishProducerRtpStream(roomName, socket.id, producerData.producer);
                });

            // Wait for all producer operations to complete
            const producerResults = await Promise.all(producerPromises);
            // console.log({ producerResults })
            // console.log({ recordInfo })
            console.log('###################')

            async function publishProducerRtpStream(roomName, socketId, producer) {
                console.log('inside publishProducerRTPStream')
                console.log({ roomName, socketId, producer })
                console.log(producer.kind)
                const rtpTransportConfig = {
                    listenIp: { ip: '0.0.0.0', announcedIp: '192.168.0.100' }, // TODO: Change announcedIp to your external IP or domain name
                    rtcpMux: true,
                    comedia: false
                };
                if (PROCESS_NAME === 'GStreamer') {
                    rtpTransportConfig.rtcpMux = false;
                }
                console.log('reach11')
                let router = rooms[roomName].router;
                // console.log(router.rtpCapabilities)
                // console.log({ router })
                console.log('reach12')

                let rtpTransport = await router.createPlainTransport(rtpTransportConfig);

                // console.log({ rtpTransport })
                const remoteRtpPort = Math.floor(Math.random() * 42000);
                let remoteRtcpPort;
                if (!rtpTransportConfig.rtcpMux) {
                    remoteRtcpPort = Math.floor(Math.random() * 22000);;
                }


                await rtpTransport.connect({
                    ip: '127.0.0.1',
                    port: remoteRtpPort,
                    rtcpPort: remoteRtcpPort
                });

                addTransport(rtpTransport, roomName, socketId)
                const codecs = [];
                // console.log(router.rtpCapabilities)
                const routerCodec = router.rtpCapabilities.codecs.find(
                    codec => codec.kind === producer.kind
                );
                console.log({ codecs })
                codecs.push(routerCodec);

                const rtpCapabilities = {
                    codecs,
                    rtcpFeedback: []
                };
                console.log('reach3')

                const rtpConsumer = await rtpTransport.consume({
                    producerId: producer.id,
                    rtpCapabilities,
                    paused: true
                });

                console.log(rtpConsumer.rtpParameters, 'rtpParameters of consumer')

                addConsumer(rtpConsumer, roomName, socketId)

                return {
                    remoteRtpPort,
                    remoteRtcpPort,
                    localRtcpPort: rtpTransport.rtcpTuple ? rtpTransport.rtcpTuple.localPort : undefined,
                    rtpCapabilities,
                    rtpParameters: rtpConsumer.rtpParameters
                };
                console.log('------------------------------------------------------------------------------------------------------')
            }

            console.log('reached***')
            // console.log({ recordInfo })

            recordInfo.fileName = Date.now().toString();
            console.log({ recordInfo }, 'above getProcess')
            let processSpawn = getProcess(recordInfo);

            console.log('reached###')

            setTimeout(async () => {
                console.log('called settimeout to resume')
                console.log(consumers[0].consumer, 'consumer')
                consumers[0].consumer.resume()
                consumers[0].consumer.requestKeyFrame()
            }, 1000);

            // setTimeout(() => {
            //     processSpawn.kill();
            // }, 60000)
        }
    })
})

const getProcess = (recordInfo) => {
    switch (PROCESS_NAME) {
        case 'GStreamer':
            return new GStreamer(recordInfo);
        case 'FFmpeg':
        default:
            return new FFmpeg(recordInfo);
    }
};


// const handleStopRecordRequest = async (jsonMessage) => {
//     console.log('handleStopRecordRequest() [data:%o]', jsonMessage);
//     const peer = peers.get(jsonMessage.sessionId);
//     if (!peer) {
//         throw new Error(`Peer with id ${jsonMessage.sessionId} was not found`);
//     }
//     if (!peer.process) {
//         throw new Error(`Peer with id ${jsonMessage.sessionId} is not recording`);
//     }
//     peer.process.kill();
//     peer.process = undefined;
//     // Release ports from port set
//     for (const remotePort of peer.remotePorts) {
//         releasePort(remotePort);
//     }
// };

//server listening on port 8899
server.listen(port, () => {
    console.log(`RTMP app listening on port ${port}`);
})