import { Device } from 'mediasoup-client';
import { useCallback, useEffect, useRef } from 'react';
import { useStateWithCallback } from './useStateWithCallback';
import { SFU__ACTIONS as ACTIONS, MEDIA__TYPE } from '@features/video-chat/sfu-topology/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleCameraMode } from '@features/video-chat/sfu-topology/redux/slices/BottomScreenController';
import { bottomScreenControllerSelector } from '../redux/slices/BottomScreenController';
import { constraints, params } from '../constants';
import { getSocket } from '../../../../../shared/helpers/SocketInit';
import { storeNewMessage } from '../redux/slices/ChannelMessage';
import { messageDto } from '../helpers/MessageDto';

let DATA_PRODUCER: any = null;

export const sendMessageCallback = () => {
    const sendChatMessage = (message: string) => {
        try {
            if (DATA_PRODUCER.current.readyState === 'open') {
                DATA_PRODUCER.current.send(JSON.stringify(message));
            }
            console.log('Message sent%');

        } catch (error) {
            console.log({ error })
        }
    }
    return (
        {
            sendChatMessage
        }
    )
}

export const UseSFUTopology = (roomName: any, userDetails: any) => {
    console.log('SFU Topology rendered')
    const { cameraMode } = useSelector(bottomScreenControllerSelector, (prev, next) => prev === next)
    const dispatch = useDispatch()
    const socket = getSocket();
    let device = useRef(null);

    let routerRtpCapabilities = useRef<any>(null);
    let producerTransport = useRef<any>(null);
    let consumerTransports = useRef<[]>([]);
    let consumingTransports = useRef<[]>([]);

    let dataConsumingTransports = useRef<[]>([])
    let dataProducerTransports = useRef<[]>([])
    let dataConsumerTransports = useRef<[]>([])

    let audioProducer = useRef<any>(null);
    let videoProducer = useRef<any>(null);
    let dataProducer = useRef<any>(null)

    let audioParams = useRef<any>({});
    let videoParams = useRef<any>(params);
    let localMediaStream = useRef<any>(null);
    let allMediaStreams = useRef<any>({})
    let newMediaStream = useRef<any>(null)
    let EFFECT__RAN = useRef<boolean>(false)

    useEffect(() => {

        const handleStartScreenSharing = async () => {
            console.log('handleStartScreenSharing')

            socket.emit(ACTIONS.REMOVE__PREVIOUS__PRODUCER, { userDetails })

            const constraints: any = {
                video: {
                    mediaSource: 'screen',
                },
                audio: true,
            };

            try {
                // newMediaStream.current = await localMediaStream.current.getAudioTracks()[0]
                // const allTracks = localMediaStream.current.getTracks()
                // allTracks.forEach((track) => track.stop())
                localMediaStream.current = null
                audioParams.current = {}
                videoParams.current = null
                localMediaStream.current =
                    await navigator
                        .mediaDevices
                        .getDisplayMedia(constraints);

                if (localMediaStream.current) {
                    // audioParams.current =
                    // {
                    //     track: newMediaStream.current,
                    //     ...audioParams
                    // };
                    audioParams.current =
                    {
                        track: localMediaStream
                            .current
                            .getAudioTracks()[0],
                        ...audioParams.current
                    };

                    videoParams.current =
                    {
                        track: localMediaStream
                            .current
                            .getVideoTracks()[0],
                        ...videoParams.current
                    };

                    console.log(newMediaStream.current)
                    // console.log(localMediaStream.current.getAudioTracks()[0])
                    // console.log(localMediaStream.current.getVideoTracks()[0])

                    console.log(audioParams.current)
                    console.log(videoParams.current)

                    // Executes when user clicks on stop sharing(button)
                    // when screen sharing is going on
                    localMediaStream
                        .current
                        .getVideoTracks()[0]
                        .onended = () => {
                            dispatch(ToggleCameraMode({
                                cameraMode: MEDIA__TYPE.CAMERA
                            }))
                        };

                    await connectSendScreenTransport();


                }

            } catch (error) {
                console.log({ error })
            }
        }

        const handleStartCamera = async () => {
            console.log("handleCameraStarted")
            try {

                socket.emit(ACTIONS.REMOVE__PREVIOUS__PRODUCER, { userDetails })
                // const allTracks = localMediaStream.current.getTracks()
                // allTracks.forEach((track) => track.stop())
                localMediaStream.current = null
                audioParams.current = null
                videoParams.current = null
                localMediaStream.current = await navigator
                    .mediaDevices
                    .getUserMedia({ audio: true, video: true });

                if (localMediaStream.current) {
                    const localElement = audioElements.current[userDetails._id]

                    if (localElement) {
                        localElement.srcObject = null
                        localElement.srcObject = localMediaStream.current
                        // localElement.volume = 0;
                    }

                    audioParams.current =
                    {
                        track: localMediaStream
                            .current
                            .getAudioTracks()[0],
                        ...audioParams.current
                    };

                    videoParams.current =
                    {
                        track: localMediaStream
                            .current
                            .getVideoTracks()[0],
                        ...videoParams.current
                    };

                    await connectSendScreenTransport();
                }

            } catch (error) {
                console.error('Error accessing %camera:', error);
            }
        }

        if (
            cameraMode === MEDIA__TYPE.SCREEN__SHARE
            &&
            EFFECT__RAN.current === true
        ) {
            handleStartScreenSharing();
        }

        if (
            cameraMode === MEDIA__TYPE.CAMERA
            &&
            EFFECT__RAN.current === true
        ) {
            handleStartCamera();
        }
        EFFECT__RAN.current = true

    }, [cameraMode])

    const [clients, setClients] = useStateWithCallback([])
    let clientsRef = useRef(null)
    let holdClient = useRef({})

    let audioElements = useRef({})
    let videoElements = useRef({})

    useEffect(() => {
        DATA_PRODUCER = dataProducer
    }, [dataProducer])

    useEffect(() => {

        clientsRef.current = clients
        // autoswiitch from sfu topology and mesh topology
        // when user leaves the room, decrease the count.


        // Check each producer that what kind of media are they sharing?

        // Trigger point
        // Continuously watch for 1.5 minute , is there any new join in the call?
        // If no any join signal is seen then only trigger it.
        // if(clientsRef.current < 4 )
        // {
        //  Then run code to establish mesh connection among remaining clients.
        //  Write relay code for socketio in sfu handling server only.
        //  Track with clientId is received.
        //  Now change the media track from audio/video html elements using queryselector (prevents re-rendering & manage state).
        //  What to do the previous sfu model?
        //  Block uplink (i.e. stop producing the media to sfu server)

        //  Consumer and Producer transports may be deleted. 
        //  So server bandwidth is preserved.
        //  Stop producing from client, close producer in server and delete producer-webrtc-transport.
        //  So consumers and consumer transport may be deleted on 'producer-close' event.
        //  Online users and offline users handling in room, should be managed by separate socket listeners process.
        //  Socket disconnect only have concerns about online / offline status in redis cluster.
        //  Ongoing calling users, will be in participants list.
        //  Chat also has same roomId as for video-chat, process with that moto. 
        //  }


        // (Mesh to SFU switching is obvious)
        // Autoswitch from mesh to sfu (currently 2 people are there).
        // Suddenly if 1 person came, proceed with mesh.
        // Suddenly if > 2 person came, then:
        // signal through socket about increasing traffic
        // Wait the traffic until we -
        // Run SFU model process and get track of previous user.
        // Then push the increasing traffic to the room.


    }, [clients])


    const getLocalMediaStream = async () => {
        try {

            localMediaStream.current = await navigator
                .mediaDevices
                .getUserMedia(constraints);

            audioParams.current = {
                track: localMediaStream.current.getAudioTracks()[0],
                ...audioParams.current
            };

            videoParams.current = {
                track: localMediaStream.current.getVideoTracks()[0],
                ...videoParams.current
            };
            addMeToClients();
            joinRoom();

        } catch (error) {
            console.log(error);
        }

    };

    const joinRoom = () => {
        socket.emit(ACTIONS.JOIN, { roomName }, (data) => {
            routerRtpCapabilities.current = data.rtpCapabilities;
            createDevice();
        });
    };

    const createDevice = async () => {
        try {
            device.current = new Device();
            await device.current.load({
                routerRtpCapabilities: routerRtpCapabilities.current
            });

            createSendTransport();

        } catch (error) {
            console.log({ error });
        }
    };

    const getProducers = () => {
        socket.emit(
            ACTIONS.GET__PRODUCERS,
            ({ producerIds,
                producerListWithClientDetails }) => {
                console.log({ producerIds })
                producerIds
                    ?.forEach(remoteProducerId =>
                        signalNewConsumerTransport(
                            remoteProducerId,
                            producerListWithClientDetails[remoteProducerId]
                        ));
            });
    };



    // new-addons

    const getDataProducers = () => {
        console.log('getDataProducers %%')
        socket.emit(
            'getDataProducers',
            ({ producerIds,
                producerListWithClientDetails }) => {
                console.log({ producerIds, producerListWithClientDetails })

                producerIds
                    ?.forEach(remoteProducerId =>
                        signalNewDataConsumerTransport(
                            remoteProducerId,
                            producerListWithClientDetails[remoteProducerId]
                        ));
            });
    }

    const signalNewDataConsumerTransport = async (remoteProducerId, remoteClientDetails) => {
        console.log('signalNewDataConsumerTransport %% ')
        if (dataConsumingTransports.current.includes(remoteProducerId)) return;

        dataConsumingTransports.current.push(remoteProducerId);

        await socket.emit(ACTIONS.CREATE__WEBRTC__TRANSPORT, { consumer: true }, ({ params }) => {

            if (params.error) {
                console.log(params.error);
                return;
            }
            let dataConsumerTransport;
            try {
                dataConsumerTransport = device.current.createRecvTransport(params);
            } catch (error) {
                console.log(error);
                return;
            }

            dataConsumerTransport.on(ACTIONS.CONNECT, async ({ dtlsParameters }, callback, errback) => {
                console.log({ dtlsParameters })
                try {
                    await socket.emit('transport-recv-connect', {
                        dtlsParameters,
                        serverConsumerTransportId: params.id
                    });
                    callback();
                } catch (error) {
                    errback(error);
                }
            });

            connectDataRecvTransport(
                dataConsumerTransport,
                remoteProducerId,
                remoteClientDetails,
                params.id
            )

        });
    };

    const connectDataRecvTransport = async (
        dataConsumerTransport,
        remoteProducerId,
        remoteClientDetails,
        serverConsumerTransportId
    ) => {

        await socket.emit(
            'consumeData',
            {
                sctpCapabilities: device.current.sctpCapabilities,
                remoteProducerId,
                remoteClientDetails,
                serverConsumerTransportId,
            },
            async ({ params }) => {
                try {

                    console.log({ params });

                    if (params.error) {
                        console.log('Cannot Consume Media', params.error);
                        return;
                    }

                    const dataConsumer = await dataConsumerTransport.consumeData(
                        {
                            id: params.id,
                            dataProducerId: params.producerId,
                            sctpStreamParameters: params.sctpStreamParameters,
                            label: params.label,
                            protocol: params.protocol
                        }
                    );

                    dataConsumerTransports.current = [
                        ...dataConsumerTransports.current,
                        {
                            dataConsumerTransport,
                            serverConsumerTransportId: params.id,
                            producerId: remoteProducerId,
                            dataConsumer
                        }
                    ];

                    dataConsumer.on("message", (newMessage, ppid) => {
                        console.log({ newMessage, ppid });
                        let messageFormat = messageDto(newMessage, remoteClientDetails)
                        dispatch(storeNewMessage(messageFormat));

                        if (ppid === 51)
                            console.log("text message received:", message.toString("utf-8"));
                        else if (ppid === 53)
                            console.log("binary message received");
                    });

                    dataConsumer.on('transportclose', () => {
                        console.log('Data consumer transport closed');
                    });

                }
                catch (error) {
                    console.log({ error });
                }
            }
        );








    }

    const createSendTransport = () => {

        socket.emit(
            ACTIONS.CREATE__WEBRTC__TRANSPORT,
            { consumer: false },
            ({ params }) => {
                if (params.error) {
                    console.log(params.error);
                    return;
                }
                producerTransport.current = device.current.createSendTransport(params);

                // no need to see this part on new toggle media
                producerTransport.current.on(ACTIONS.CONNECT, async ({ dtlsParameters }, callback, errback) => {
                    try {
                        await socket.emit(ACTIONS.TRANSPORT__CONNECT, { dtlsParameters });
                        callback(); // confirms dtls exchange is successfull to device
                    } catch (error) {
                        errback(error);
                    }
                });

                producerTransport.current.on(ACTIONS.PRODUCE, async (parameters, callback, errback) => {
                    console.log('action.produce data called....')
                    try {
                        await socket.emit(ACTIONS.TRANSPORT__PRODUCE, {
                            kind: parameters.kind,
                            rtpParameters: parameters.rtpParameters,
                            appData: parameters.appData
                        }, ({ id, producersExists }) => {
                            callback({ id });
                            if (producersExists) getProducers();
                        });

                    } catch (error) {
                        errback(error);
                    }
                });

                producerTransport.current.on('producedata', async (parameters, callback, errback) => {
                    console.log('producedata listener from client %% is called....');

                    console.log({ parameters, callback, errback }, 'check here sctp parameters or what');

                    try {
                        await socket.emit('transportProduceData',
                            {
                                transportId: producerTransport.current.id,
                                sctpStreamParameters: parameters.sctpStreamParameters,
                                label: parameters.label,
                                protocol: parameters.protocol
                            }
                            , ({ id, dataProducersExists }) => {
                                callback({ id });
                                if (dataProducersExists) getDataProducers();
                            });

                    }
                    catch (error) {
                        errback(error);
                    }

                });

                connectSendTransport();
            }
        );
    };

    const connectSendTransport = async () => {

        audioProducer.current = await producerTransport.current.produce(audioParams.current);
        videoProducer.current = await producerTransport.current.produce(videoParams.current);

        dataProducer.current = await producerTransport.current.produceData(
            {
                label: 'channel-1'
            }
        );

        // Once the send transport is created, the client side application can produce multiple DataChannels on it.
        // The application calls transport.produceData() in the local send transport.
        // The transport will emit “connect” if this is the first call to transport.produceData().
        // The transport will emit “producedata” so the application will transmit the event parameters to the server and will create a DataProducer instance in server side.
        // Finally transport.produceData() will resolve with a DataProducer instance in client side

        audioProducer.current.on(ACTIONS.TRACK__ENDED, () => {
            console.log('audio track ended');
        });

        audioProducer.current.on(ACTIONS.TRANSPORT__CLOSE, () => {
            console.log('audio transport ended');
        });

        videoProducer.current.on(ACTIONS.TRACK__ENDED, () => {
            console.log('video track ended');
        });

        videoProducer.current.on(ACTIONS.TRANSPORT__CLOSE, () => {
            console.log('video transport ended');
        });

    };

    const connectSendScreenTransport = async () => {
        /**
         * Look same transport is used to produce both audio and video
         * But audioProducer and videoProducer are separate concern
         */

        // This can be possibility of sharing multiple screens simultaneously
        if (audioParams.current.track) {
            audioProducer.current = await producerTransport.current.produce(audioParams.current);
        }
        if (videoParams.current.track) {
            videoProducer.current = await producerTransport.current.produce(videoParams.current);
        }

        audioProducer.current.on(ACTIONS.TRACK__ENDED, () => {
            console.log('audio track ended');
            // close audio track
        });
        audioProducer.current.on(ACTIONS.TRANSPORT__CLOSE, () => {
            console.log('audio transport ended');
            // close audio track
        });

        videoProducer.current.on(ACTIONS.TRACK__ENDED, () => {
            console.log('video track ended');
            // close video track
        });
        videoProducer.current.on(ACTIONS.TRANSPORT__CLOSE, () => {
            console.log('video transport ended');
            // close video track
        });

    };

    const handleClient = useCallback(
        ({ trackKind, ...newUserDetails }, cb) => {
            const isClientAlreadyExists = clients
                .find(client =>
                    client._id === newUserDetails._id
                    && client['audioProducerId']
                    && client['videoProducerId']
                )
            if (isClientAlreadyExists) return;

            if (
                trackKind === 'audio'
                &&
                newUserDetails['audioProducerId']
            ) {
                setClients(
                    (existingClients) => [...existingClients, newUserDetails],
                    cb
                )
            }

            else if (
                trackKind === 'video'
                &&
                newUserDetails['videoProducerId']
            ) {

                setClients(
                    existingClients => {
                        const updated =
                            existingClients
                                .map(client => {
                                    if (client._id === newUserDetails._id) {
                                        return {
                                            ...client,
                                            videoProducerId: newUserDetails.videoProducerId
                                        }
                                    }
                                    return client;
                                })
                        return updated;
                    },
                    cb
                )
            }
        },
        [clients, setClients]
    );

    const connectRecvTransport = async (
        consumerTransport,
        remoteProducerId,
        remoteClientDetails,
        serverConsumerTransportId) => {

        await socket.emit(
            ACTIONS.CONSUME,
            {
                rtpCapabilities: device.current.rtpCapabilities,
                remoteProducerId,
                remoteClientDetails,
                serverConsumerTransportId,
            },
            async ({ params }) => {
                try {

                    if (params.error) {
                        console.log('Cannot Consume Media', params.error);
                        return;
                    }

                    const consumer = await consumerTransport.consume({
                        id: params.id,
                        producerId: params.producerId,
                        kind: params.kind,
                        rtpParameters: params.rtpParameters
                    });

                    consumerTransports.current = [
                        ...consumerTransports.current,
                        {
                            consumerTransport,
                            serverConsumerTransportId: params.id,
                            producerId: remoteProducerId,
                            consumer
                        }
                    ];

                    console.log({ consumer }, 'searching the track or data...')


                    if (consumer.track) {

                        const { track } = consumer;

                        let type;

                        if (params.kind === 'audio') {
                            type = 'audioProducerId'
                            if (!allMediaStreams.current[remoteClientDetails._id]) {
                                allMediaStreams.current[remoteClientDetails._id] = {};
                            }
                            if (allMediaStreams.current[remoteClientDetails._id]['audio']) {
                                allMediaStreams.current[remoteClientDetails._id]['audio']
                                    .getTracks()
                                    .forEach(track => track.stop)
                                console.log('track close %audio')
                            }
                            allMediaStreams.current[remoteClientDetails._id]['audio'] = new MediaStream([track]);
                        }

                        else if (params.kind === 'video') {
                            type = 'videoProducerId'
                            if (!allMediaStreams.current[remoteClientDetails._id]) {
                                allMediaStreams.current[remoteClientDetails._id] = {};
                            }
                            if (allMediaStreams.current[remoteClientDetails._id]['video']) {
                                allMediaStreams.current[remoteClientDetails._id]['video']
                                    .getTracks()
                                    .forEach(track => track.stop)
                                console.log('track close %video')

                            }
                            allMediaStreams.current[remoteClientDetails._id]['video'] = new MediaStream([track]);
                        }

                        const currentUser = clientsRef.current
                            .find(client => client._id === remoteClientDetails._id)

                        if (
                            holdClient.current[remoteClientDetails._id]
                            &&
                            audioElements.current[remoteClientDetails._id]
                            &&
                            videoElements.current[remoteClientDetails._id]
                        ) {

                            if (params.kind === 'audio') {
                                audioElements.current[remoteClientDetails._id].srcObject =
                                    allMediaStreams
                                        .current[remoteClientDetails._id]['audio']

                                // socket.emit(ACTIONS.MUTE__INFO, {
                                //     peerUserId: remoteClientDetails._id,
                                //     roomName,
                                //     muted: currentUser.muted
                                // })

                                // const divToInject = document.getElementById('testscreen');
                                // const audioElement = document.createElement('audio');
                                // audioElement.controls = true;
                                // audioElement.src = allMediaStreams.current[remoteClientDetails._id]['audio']
                                // divToInject.appendChild(audioElement);
                                // console.log(allMediaStreams.current[remoteClientDetails._id]['audio'])

                            }

                            else if (params.kind === 'video') {
                                videoElements.current[remoteClientDetails._id].srcObject =
                                    allMediaStreams
                                        .current[remoteClientDetails._id]['video']

                                delete holdClient.current[remoteClientDetails._id]
                            }
                        }

                        if (!holdClient.current[remoteClientDetails._id]) {

                            handleClient(
                                ({
                                    ...remoteClientDetails,
                                    muted: true,
                                    trackKind: params.kind,
                                    [type]: params.producerId
                                }),
                                () => {

                                    if (currentUser && params.kind === 'audio') {
                                        socket.emit(ACTIONS.MUTE__INFO, {
                                            peerUserId: remoteClientDetails._id,
                                            roomName,
                                            muted: currentUser.muted
                                        })
                                    }

                                    // const divToInject = document.getElementById('testscreen');
                                    // const audioElement = document.createElement('video');
                                    // audioElement.src = allMediaStreams.current[remoteClientDetails._id]['video']
                                    // divToInject.appendChild(audioElement);
                                    // console.log(allMediaStreams.current[remoteClientDetails._id]['video'])

                                }
                            )

                        }
                        socket.emit(
                            ACTIONS.CONSUMER__RESUME,
                            { serverConsumerId: params.serverConsumerId }
                        );
                    }


                } catch (error) {
                    console.log({ error });
                }
            }
        );
    };

    const signalNewConsumerTransport = async (remoteProducerId, remoteClientDetails) => {

        if (consumingTransports.current.includes(remoteProducerId)) return;
        consumingTransports.current.push(remoteProducerId);

        await socket.emit(ACTIONS.CREATE__WEBRTC__TRANSPORT, { consumer: true }, ({ params }) => {

            if (params.error) {
                console.log(params.error);
                return;
            }
            let consumerTransport;
            try {
                consumerTransport = device.current.createRecvTransport(params);
            } catch (error) {
                console.log(error);
                return;
            }

            consumerTransport.on(ACTIONS.CONNECT, async ({ dtlsParameters }, callback, errback) => {
                try {
                    await socket.emit('transport-recv-connect', {
                        dtlsParameters,
                        serverConsumerTransportId: params.id
                    });
                    callback();
                } catch (error) {
                    errback(error);
                }
            });

            connectRecvTransport(
                consumerTransport,
                remoteProducerId,
                remoteClientDetails,
                params.id)

        });
    };


    /**
     * Now initialize the connection inside useEffect
     * Remember to handle <React.StrictMode> (>18.0.0)
     * that causes useEffect to run twice in development mode
     */

    // socket cleanup handlers
    const handleConnectionSuccess = (data) => {
        console.log({ data }, 'connection-success payload');
    }

    const handleNewProducer =
        ({ producerId, clientDetails }) =>
            signalNewConsumerTransport(producerId, clientDetails)

    const handleNewDataProducer =
        ({ producerId, clientDetails }) => {
            console.log(' %% new Data producer...callled ');
            console.log({ producerId, clientDetails })
            signalNewDataConsumerTransport(producerId, clientDetails);
        }


    /*  Executed on producer died
    *   Also on toggle between screenshare and webcam
    */
    let helperRef = useRef({})

    const handleProducerClosed = ({ remoteProducerId, remoteClientDetails }) => {
        console.log('producer-closed event received', { remoteProducerId, remoteClientDetails })

        // killing previous producer
        const producerToClose = consumerTransports.current.find(
            transportData => transportData.producerId === remoteProducerId
        );
        producerToClose.consumerTransport.close();
        producerToClose.consumer.close();
        consumerTransports.current = consumerTransports
            .current
            .filter(transportData =>
                transportData.producerId
                !==
                remoteProducerId
            );

        // If holdClient includes client, simply do nothing
        // else remove client from clients[]

        if (
            !holdClient.current[remoteClientDetails._id]
        ) {
            console.log('There is no holdclients...removing producer..')

            if (helperRef.current['executedForAudio'] === true) {

                delete allMediaStreams.current[remoteClientDetails._id]
                delete audioElements.current[remoteClientDetails._id]
                delete videoElements.current[remoteClientDetails._id]

                setClients(client => {
                    const remainingLiveClients =
                        client
                            .filter(
                                (client) =>
                                    client._id
                                    !==
                                    remoteClientDetails._id)

                    return remainingLiveClients
                });
                helperRef.current = {}
            }

            helperRef.current['audioProducerId'] = remoteProducerId;
            helperRef.current['executedForAudio'] = true
        }

    }

    const handleSetMute = (muteState, userId) => {

        //Learn if it is possible to do

        if (audioElements.current[userId]) {
            audioElements.current[userId].muted = muteState
        }



        // const clientIndex = clientsRef.current
        //     .map((client) => client._id)
        //     .indexOf(userId)

        // const allConnectedClients = JSON.parse
        //     (JSON.stringify(clientsRef.current))

        // if (clientIndex > -1) {
        //     allConnectedClients[clientIndex].muted = muteState
        //     setClients(allConnectedClients)
        // }

    }

    const handleMuteInfo = ({ userId, isMute, peerId }) => {
        handleSetMute(isMute, userId)
    }

    const handleMute = ({ userId }) => {
        handleSetMute(true, userId)
    }

    const handleUnmute = ({ userId }) => {
        handleSetMute(false, userId)
    }

    const addMeToClients = () => {
        handleClient(
            {
                ...userDetails,
                muted: true
            },
            () => {
                // Make volume to zero of audio instance
                // Then inject the stream
                const localAudioElement = audioElements.current[userDetails._id]
                console.log({ localAudioElement })

                if (localAudioElement) {
                    localAudioElement.volume = 0;
                    localAudioElement.srcObject = localMediaStream.current
                }
            })
    }

    const handleHoldClient = ({ userDetails }) => {
        holdClient.current[userDetails._id] = userDetails
    }

    useEffect(() => {

        if (userDetails) {
            getLocalMediaStream();
            socket.emit(ACTIONS.JOIN_FOR_SOCKET_USER_MAP, { roomName, userDetails })
            socket.on(ACTIONS.CONNECTION__SUCCESS, handleConnectionSuccess);
            socket.on(ACTIONS.NEW__PRODUCER, handleNewProducer);
            socket.on('newDataProducer', handleNewDataProducer)

            socket.on(ACTIONS.PRODUCER__CLOSED, handleProducerClosed);

            // socket.on('dataProducerClosed',handleDataProducerClosed);

            socket.on(ACTIONS.MUTE__INFO, handleMuteInfo)
            socket.on(ACTIONS.MUTE, handleMute)
            socket.on(ACTIONS.UNMUTE, handleUnmute)
            socket.on(ACTIONS.HOLD__CLIENT, handleHoldClient)
            // socket.on(ACTIONS.REMOVE__PEER, handleRemovePeer)
        }

        return () => {

            socket.off(ACTIONS.NEW__PRODUCER, handleNewProducer);
            socket.off('newDataProducer', handleNewDataProducer);
            socket.off(ACTIONS.PRODUCER__CLOSED, handleProducerClosed);
            socket.off(ACTIONS.CONNECTION__SUCCESS, handleConnectionSuccess);
            socket.off(ACTIONS.MUTE__INFO, handleMuteInfo);
            socket.off(ACTIONS.MUTE, handleMute);
            socket.off(ACTIONS.UNMUTE, handleUnmute)
            socket.off(ACTIONS.HOLD__CLIENT, handleHoldClient)
            socket.disconnect()
            // socket.off(ACTIONS.REMOVE__PEER, handleRemovePeer);

        }
    }, []);

    const provideRef = ({
        instance,
        clientId,
        instanceType,
    }) => {

        if (
            allMediaStreams.current[clientId]
            && instance) {
            if (instanceType === 'audio') {
                audioElements.current[clientId] = instance;
                audioElements.current[clientId].srcObject =
                    allMediaStreams
                        .current[clientId]['audio']

            }
            else if (instanceType === 'video' && instance) {
                videoElements.current[clientId] = instance;
                videoElements.current[clientId].srcObject =
                    allMediaStreams
                        .current[clientId]['video']
            }

        } else {
            console.log(`Client ID ${clientId} or instance ${instance} not found in allMediaStreams`);
        }
    };


    const handleSelfMute = (isMute, userId) => {
        console.log({ isMute, userId }, 'handleSelf muted is called')
        let settled = false
        if (userDetails._id === userId) {
            const interval = setInterval(() => {
                if (localMediaStream.current) {
                    localMediaStream.current
                        .getTracks()[0].enabled = !isMute

                    if (isMute) {
                        socket.emit(
                            ACTIONS.MUTE,
                            { isMute, userId })
                    }
                    else {
                        socket.emit(
                            ACTIONS.UNMUTE,
                            { isMute, userId })
                    }
                    settled = true
                }
                if (settled) {
                    clearInterval(interval)
                }
            }, 250)
        }
    }

    return {
        provideRef,
        handleSelfMute,
        clients
    }

};
