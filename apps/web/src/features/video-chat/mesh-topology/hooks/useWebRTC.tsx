import freeIce from "freeice";
import { useRef, useCallback, useEffect, useState } from 'react';
import { useStateWithCallback } from './useStateWithCallback';
import { MESH__ACTIONS as ACTIONS, MEDIA__TYPE } from "../actions/actions";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { bottomScreenControllerSelector } from "../redux/slices/BottomScreenController";
import { getSocket } from "../../../../../shared/helpers/SocketInit";
import { storeNewMessage } from "../redux/slices/ChannelMessage";
import { messageDto } from "../../sfu-topology/helpers/MessageDto";

let senderChannels = {};
let CONNECTIONS = {};

export const connectionsWithSendMessageCallback = () => {

    const [refresh, setRefresh] = useState(false)

    const getSenderChannelsArray = (channels: any) => Object.values(channels);

    const sendGroupMessageViaChannel = (message: string) => {
        try {
            const senderChannelsArray = getSenderChannelsArray(senderChannels)
            senderChannelsArray.forEach((senderChannel) => {
                senderChannel.send(message);
            })
            console.log('Message sent%')
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        console.log('channel useeffect ran');

        if (senderChannels) {
            setRefresh(!refresh)
            console.log('channel useeffect ran inside iff...');
        }

    }, [senderChannels])

    return (
        {
            senderChannels,
            connections: CONNECTIONS,
            sendGroupMessageViaChannel
        }
    )
}

export const useWebRTC = (roomId:string, userDetails:any) => {

    const dispatch = useDispatch()
    const { cameraMode } = useSelector(bottomScreenControllerSelector, (prev, next) => prev === next)
    const socket = getSocket()
    const [clients, setClients] = useStateWithCallback([])
    const clientsRef = useRef(null)
    const localMediaStream = useRef(null);
    const connections = useRef({});
    const audioElements = useRef({});
    const offerRef = useRef(0);
    const presenterRef = useRef(false);
    const onTrackRef = useRef(0);
    const newMediaStream = useRef(null);
    const initConnectionRef = useRef(0);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    let EFFECT_RAN = useRef(false);

    useEffect(() => {
        const handleStartScreenSharing = async () => {
            try {
                const constraints = {
                    video: {
                        mediaSource: 'screen',
                    },
                    audio: true,
                };
                newMediaStream.current = await navigator.mediaDevices.getDisplayMedia(constraints);
                if (newMediaStream.current) {
                    offerRef.current = 0
                    presenterRef.current = true
                    const allTracks = localMediaStream.current.getTracks()
                    allTracks.forEach((track) => {
                        track.stop()
                    })
                    localMediaStream.current = null
                    localMediaStream.current = newMediaStream.current
                    localMediaStream.current
                        .getTracks()
                        .forEach((track) => {
                            for (const peerId in connections.current) {
                                connections.current[peerId]
                                    .addTrack(track, localMediaStream.current)
                            }
                        })
                    const localElement = audioElements.current[userDetails._id]
                    if (localElement) {
                        localElement.volume = 0;
                        localElement.srcObject = localMediaStream.current
                    }

                    localMediaStream.current.getVideoTracks()[0].onended = () => {
                        dispatch(handleCamera({
                            isFirstConnection: false,
                            mediaType: MEDIA__TYPE.CAMERA
                        }))
                    };
                }

            } catch (error) {
                console.error('Error accessing screen:', error);
            }
        }

        const handleStartCamera = async () => {
            try {
                offerRef.current = 0
                presenterRef.current = true
                const allTracks = localMediaStream.current.getTracks()
                allTracks.forEach((track) => track.stop())
                localMediaStream.current = null
                localMediaStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localMediaStream.current.getTracks().forEach((track) => {
                    for (const peerId in connections.current) {
                        connections.current[peerId].addTrack(track, localMediaStream.current)
                    }
                })
                const localElement = audioElements.current[userDetails._id]
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current
                }
            } catch (error) {
                console.error('Error accessing screen:', error);
            }
        }

        if (cameraMode == MEDIA__TYPE.SCREEN__SHARE && EFFECT_RAN.current === true) {
            handleStartScreenSharing()
        }
        if (cameraMode == MEDIA__TYPE.CAMERA && EFFECT_RAN.current === true) {
            handleStartCamera()
        }

        EFFECT_RAN.current = true

    }, [cameraMode])


    // useEffect(() => {

    //     const handleStartRecording = async () => {
    //         try {
    //             const screenRecordStream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true })
    //             mediaRecorderRef.current = new MediaRecorder(screenRecordStream)
    //             mediaRecorderRef.current.ondataavailable = handleDataAvailable
    //             mediaRecorderRef.current.onstop = handleRecordingStop
    //             mediaRecorderRef.current.start()
    //             recordedChunksRef.current = []
    //         } catch (error) {
    //             console.log("Error while recording", error)
    //         }
    //     }

    //     const handleDataAvailable = (event) => {
    //         if (event.data.size > 0) {
    //             recordedChunksRef.current.push(event.data);
    //         }
    //     }

    //     const clearMediaRecorderTracks = () => {
    //         if (mediaRecorderRef.current) {
    //             mediaRecorderRef.current.stop();
    //             const tracks = mediaRecorderRef.current.getTracks();
    //             tracks.forEach((track) => track.stop());
    //         }
    //     }

    //     const generateRandomNum = () => {
    //         return Math.floor(Math.random() * 789654123 * Math.random())
    //     }

    //     const handleRecordingStop = async () => {
    //         clearMediaRecorderTracks()
    //         const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
    //         const formData = new FormData();
    //         formData.append('video', blob);
    //         const videoURL = URL.createObjectURL(blob);
    //         const downloadLink = document.createElement('a');
    //         downloadLink.href = videoURL;
    //         downloadLink.download = `recorded__video__${generateRandomNum()}.webm`;
    //         downloadLink.click();
    //         URL.revokeObjectURL(videoURL);
    //     }

    //     if (recording.isRecording && !recording.stopNow) {
    //         try {
    //             handleStartRecording()
    //         } catch (error) {
    //             console.log({ error })
    //         }
    //     }
    // }, [recording])

    const captureMediaCamera = async () => {
        localMediaStream.current = await navigator
            .mediaDevices
            .getUserMedia({ audio: true, video: true })
    }

    useEffect(() => {
        clientsRef.current = clients
    }, [clients])

    useEffect(() => {
        CONNECTIONS = connections
    }, [connections])

    const handleNewPeerClient = useCallback(
        (newUserDetails, cb) => {
            const isClientAlreadyExists = clients
                ?.find((client) => client._id === newUserDetails._id)
            if (!isClientAlreadyExists) {
                setClients(
                    (existingClients) => [...existingClients, newUserDetails],
                    cb
                );
            }
        },
        [clients, setClients]
    );

    const handleRemovePeer = ({ peerId, userId }) => {
        // gracefully close the connection
        if (connections.current[peerId]) {
            connections.current[peerId].close()
        }
        delete connections.current[peerId]
        delete audioElements.current[peerId]
        setClients(
            existingClients =>
                existingClients
                    .filter((client) => client._id !== userId))
    }

    const handleExchangeIceCandidate = ({ peerId, iceCandidate }) => {
        console.log('ice-client')

        if (iceCandidate) {
            connections.current[peerId].addIceCandidate(iceCandidate)
        }
    }

    const handleExchangeSessionDescription = async ({ peerId, sessionDescription: remoteSessionDescription }) => {

        connections.current[peerId]
            .setRemoteDescription
            (new RTCSessionDescription(remoteSessionDescription))

        if (remoteSessionDescription.type === 'offer') {
            const connection = connections.current[peerId]
            const answer = await connection.createAnswer()
            await connection.setLocalDescription(answer)
            socket.emit
                (ACTIONS.SESSION__DESCRIPTION__TRANSPORTER, {
                    peerId: peerId,
                    sessionDescription: answer
                })
        }
    }

    const handleSetMute = (muteState, userId) => {
        const clientIndex = clientsRef.current.map((client) => client._id).indexOf(userId)
        const allConnectedClients = JSON.parse(JSON.stringify(clientsRef.current))
        if (clientIndex > -1) {
            allConnectedClients[clientIndex].muted = muteState
            setClients(allConnectedClients)
        }
    }

    const handleNewPeer = async ({ peerId, clientDetails, createOffer }) => {

        console.log({ peerId, clientDetails, createOffer })

        if (peerId in connections.current) {
            return console.warn(`You are already connected with ${clientDetails?.name} having PeerId: ${peerId} `)
        }

        connections.current[peerId] = new RTCPeerConnection({
            iceServers: freeIce()
        })

        // creating data channels
        const handleSendChannelStatusChange = (event) => {
            console.log('channel opened', { event })
            // console.log('send channel status: ' + this.state.sendChannels[0].readyState)
        }

        senderChannels[peerId] = connections.current[peerId].createDataChannel('sendChannel');
        senderChannels[peerId].onopen = handleSendChannelStatusChange;

        // Receive Channels
        const handleReceiveMessage = (event) => {
            const newMessage = event.data
            console.log({ newMessage })

            let messageFormat = messageDto(newMessage, clientDetails)
            dispatch(storeNewMessage(messageFormat));

        }

        const handleReceiveChannelStatusChange = (event) => {
            console.log(event, 'event')
        }

        const receiveChannelCallback = (event) => {
            const receiveChannel = event.channel
            receiveChannel.onmessage = handleReceiveMessage
            receiveChannel.onopen = handleReceiveChannelStatusChange
            receiveChannel.onclose = handleReceiveChannelStatusChange
        }

        connections.current[peerId].ondatachannel = receiveChannelCallback

        connections.current[peerId].onicecandidate = (event) => {
            socket.emit(ACTIONS.ICE__CANDIDATE__TRANSPORTER, {
                peerId,
                iceCandidate: event.candidate
            })
        };

        connections.current[peerId].onnegotiationneeded = async () => {
            if (presenterRef.current) {
                try {
                    if (offerRef.current == 0) {
                        const offer = await connections.current[peerId]?.createOffer()
                        await connections.current[peerId]?.setLocalDescription(offer)
                        if (offer) {
                            socket.emit(ACTIONS.SESSION__DESCRIPTION__TRANSPORTER, {
                                peerId,
                                sessionDescription: offer
                            })
                        }
                        offerRef.current = 1
                    }
                } catch (error) {
                    console.error('Error creating offer: on handleNegotiationNeeded event', error);
                }
            }
        };

        connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
            console.log({ remoteStream })
            if (onTrackRef.current > 2) {
                if (audioElements.current[clientDetails._id]) {
                    audioElements.current[clientDetails._id].srcObject = remoteStream
                }
                else {
                    let settled = false;
                    const interval = setInterval(() => {
                        if (audioElements.current[clientDetails._id]) {

                            audioElements.current[clientDetails._id].srcObject = remoteStream
                            settled = true
                        }
                        if (settled) {
                            clearInterval(interval)
                        }
                    }, 300)
                }
            }

            else {
                console.log('else part called')
                onTrackRef.current = onTrackRef.current + 1
                handleNewPeerClient(
                    ({ ...clientDetails, muted: true }),
                    () => {
                        console.log({ clientDetails }, 'line 316')
                        console.log(clientsRef.current)

                        const currentUser = clientsRef.current
                            .find(client => client._id === clientDetails._id)

                        if (currentUser) {
                            socket.emit(ACTIONS.MUTE__INFO, {
                                peerUserId: userDetails._id,
                                roomId,
                                muted: currentUser.muted
                            })
                        }

                        console.log({ audioElements, clientDetails }, 'adding track in instance')

                        if (audioElements.current[clientDetails._id]) {
                            audioElements.current[clientDetails._id].srcObject = remoteStream
                        }
                        else {
                            let settled = false;
                            const interval = setInterval(() => {
                                if (audioElements.current[clientDetails._id]) {
                                    audioElements.current[clientDetails._id].srcObject = remoteStream
                                    settled = true
                                }
                                if (settled) {
                                    clearInterval(interval)
                                }
                            }, 300)
                        }

                    }
                )
            }
        }

        localMediaStream.current.getTracks().forEach((track) => {
            console.log({ track })
            connections.current[peerId].addTrack(track, localMediaStream.current)
        })

        if (createOffer) {
            const offer = await connections.current[peerId].createOffer()
            await connections.current[peerId].setLocalDescription(offer)
            socket.emit(
                ACTIONS.SESSION__DESCRIPTION__TRANSPORTER, {
                peerId,
                sessionDescription: offer
            })
        }
    }

    useEffect(() => {

        const initConnection = async () => {

            await captureMediaCamera()

            handleNewPeerClient({ ...userDetails, muted: true }, () => {
                const localElement = audioElements.current[userDetails._id]
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current
                }
            })

            socket.emit(ACTIONS.JOIN, { roomId, userDetails })

            socket.on(
                ACTIONS.ADD__PEER,
                handleNewPeer);

            socket.on(
                ACTIONS.REMOVE__PEER,
                handleRemovePeer)

            socket.on(
                ACTIONS.EXCHANGE__ICE__CANDIDATE,
                handleExchangeIceCandidate);

            socket.on(
                ACTIONS.EXCHANGE__SESSION__DESCRIPTION,
                handleExchangeSessionDescription);

            socket.on(ACTIONS.MUTE__INFO,
                ({ userId, isMute, peerId }) => {
                    handleSetMute(isMute, userId)
                })

            socket.on(ACTIONS.MUTE, ({ userId }) => {
                handleSetMute(true, userId)
            })

            socket.on(ACTIONS.UNMUTE, ({ userId }) => {
                handleSetMute(false, userId)
            })
        }

        try {
            if (initConnectionRef.current === 0) {
                initConnection()
                initConnectionRef.current = 1
            }

        } catch (error) {
            console.log({ error })
        }

        return () => {

            localMediaStream.current
                ?.getTracks()
                ?.forEach(track => track.stop())

            socket.emit(ACTIONS.LEAVE, { roomId })
            for (let peerId in connections.current) {
                connections.current[peerId].close()
                delete connections.current[peerId]
                delete audioElements.current[peerId]
            }
            socket.off(ACTIONS.ADD__PEER)
            socket.off(ACTIONS.REMOVE__PEER)
            socket.off(ACTIONS.MUTE)
            socket.off(ACTIONS.UNMUTE)
            socket.off(ACTIONS.MUTE__INFO)
            socket.off(ACTIONS.ICE__CANDIDATE__TRANSPORTER)
            socket.off(ACTIONS.SESSION__DESCRIPTION__TRANSPORTER)
        }
    }, [])

    const provideRef = ({ instance, clientId }) => {
        console.log({ instance, clientId })
        audioElements.current[clientId] = instance
    }

    const handleSelfMute = (isMute, userId) => {
        let settled = false
        if (userDetails._id === userId) {
            const interval = setInterval(() => {
                if (localMediaStream.current) {
                    localMediaStream.current.getTracks()[0].enabled = !isMute
                    if (isMute) {
                        socket.emit(ACTIONS.MUTE, { isMute, userId })
                    }
                    else {
                        socket.emit(ACTIONS.UNMUTE, { isMute, userId })
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
        clients,
        provideRef,
        handleSelfMute,
        connections
    }
}



/**
 * ----------------Consider this--------------
 * ------Previously was added in bottom part of useEffect-------
 */

// if (media.mediaType == MEDIA___TYPE.SCREEN__SHARE && !media.isFirstConnection) {
//     socket.off(ACTIONS.CHANGE__MEDIA___STREAM__TO__SCREEN__SHARE)
// }
// else if (media.mediaType == MEDIA___TYPE.CAMERA && !media.isFirstConnection) {
//     socket.off(ACTIONS.CHANGE__MEDIA___STREAM__TO__CAMERA)
// }