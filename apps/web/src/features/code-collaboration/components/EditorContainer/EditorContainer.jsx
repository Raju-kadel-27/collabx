import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Avatar, AvatarGroup, Select } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { MESH__ACTIONS as ACTIONS, MEDIA__TYPE } from '../../../video-chat/mesh-topology/actions/actions';
import { useWebRTC } from "../../../video-chat/mesh-topology/hooks/useWebRTC";

// import { VideoRoomBottomControllers } from './SingleVideoRoom';
import axios from 'axios';
import { FiMoon } from 'react-icons/fi';
import { VscDebugStart } from 'react-icons/vsc';

// import { handleCamera, handleMedia } from '../features/video/VideoSlice';
import { userSelector } from '../../../authentication/redux/slices/userSlice';
import { CodemirrorEditor } from '../CodeMirrorEditor/CodeMirrorEditor';
import {
    BiLogoJavascript,
    BiLogoGoLang,
    BiLogoPython,
    BiLogoJava,
    BiFullscreen
} from 'react-icons/bi';
import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';
import { getSocket } from '../../../../shared/helpers/socket';

export const EditorContainer = () => {
    // const rooms = ['room1', 'room2', 'room3', "room4"]
    // const randomIndex = Math.ceil(Math.random() * 4)
    // console.log({ randomIndex })
    // let roomId = rooms[randomIndex]

    let roomId = 'room1'
    const dispatch = useDispatch()
    const user = useSelector(userSelector, (prev, next) => prev === next);

    // let clients = []
    const { clients, provideRef, handleSelfMute } = useWebRTC(roomId, user)
    // const { clients, provideRef, handleSelfMute } = UseSFUTopology(roomId, user)

    const [language, setLanguage] =
        useState({
            Java: 'Java'
        })

    const [output, setOutput] = useState({});
    const socket = getSocket();

    const fullScreenElem = useRef(null);
    const fullScreenElem2 = useRef(null);

    let codeRef = useRef('');
    const location = useLocation();
    const reactNavigator = useNavigate();


    const handleFullScreen = (event) => {

        if (!document.fullscreenElement) {
            fullScreenElem.current.requestFullscreen()
                .catch((err) => console.error('Error attempting to enable full-screen mode:', err));
        } else {
            document.exitFullscreen();
        }
    };
    const handleFullScreen2 = (event) => {

        if (!document.fullscreenElement) {
            fullScreenElem2.current.requestFullscreen()
                .catch((err) => console.error('Error attempting to enable full-screen mode:', err));
        } else {
            document.exitFullscreen();
        }
    };



    // useEffect(() => {
    //     const init = async () => {

    //         socket.on('connect_error', (err) => handleErrors(err));
    //         socket.on('connect_failed', (err) => handleErrors(err));

    //         function handleErrors(e) {
    //             console.log('socket error', e);
    //             toast.error('Socket connection failed, try again later.');
    //             reactNavigator('/');
    //         }

    //         socket.emit(ACTIONS.JOIN_FROM_CODE_EDITOR, {
    //             roomId,
    //             userName: user?.userName,
    //         });

    //         // Listening for joined event
    //         socket.on(
    //             ACTIONS.JOINED_FROM_CODE_EDITOR,
    //             ({ clients, user, socketId }) => {
    //                 if (user !== user?.userName) {
    //                     toast.success(`${user} joined the room.`);
    //                     console.log(`${user} joined`);
    //                 }
    //                 setClients(clients);
    //                 socket.emit(ACTIONS.SYNC_CODE_FROM_CODE_EDITOR, {
    //                     code: codeRef.current,
    //                     socketId,
    //                 });
    //             }
    //         );

    //         // Listening for disconnected
    //         socket.on(
    //             ACTIONS.DISCONNECTED_FROM_CODE_EDITOR,
    //             ({ socketId, user }) => {
    //                 toast.success(`${user} left the room.`);
    //                 setClients((prev) => {
    //                     return prev.filter(
    //                         (client) => client.socketId !== socketId
    //                     );
    //                 });
    //             }
    //         );
    //     };

    //     if (socket) {
    //         console.log(socket)
    //         init();
    //     }

    //     return () => {
    //         socket.emit(ACTIONS.DISCONNECTING_FROM_CODE_EDITOR);
    //         socket.off(ACTIONS.JOINED_FROM_CODE_EDITOR);
    //         socket.off(ACTIONS.DISCONNECTED_FROM_CODE_EDITOR);
    //     };
    // }, [socket]);



    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    const run = () => {
        let code = codeRef.current
        fetch('http://localhost:3000/run-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        })
            .then((response) => response.json())
            .then((result) => {
                // Handle the result returned by the server.
                // console.log('Execution result:', result);
                setOutput(result)
            })
            .catch((error) => {
                // Handle any errors that occur during the fetch.
                console.error('Fetch error:', error);
            })



    }

    // if (!location.state) {
    //     return <Navigate to="/" />;
    // }
    // console.log({ language })
    const handleOption = (e) => {
        // console.log(e.target)
        setLanguage({ [e.target.value]: e.target.value })
    }
    const handleToggleMediaType = () => {
        // media.mediaType === 'camera' ?
        //     dispatch(handleMedia({
        //         mediaType: MEDIA__TYPE.SCREEN__SHARE,
        //         isFirstConnection: false
        //     })) :
        //     dispatch(handleCamera({
        //         isFirstConnection: false,
        //         mediaType: MEDIA__TYPE.CAMERA
        //     }))
    }
    return (
        <>
            <div className="container-box h-screen overflow-hidden ">

                <div className='h-5 bg-slate-50' >
                </div>
                <div className='flex h-full w-full '>

                    <div className="editorWrap flex-grow">
                        <div className='flex justify-between'>
                            <div className=' w-full h-5 justify-between hover:cursor-pointer 
                            transition-all duration-150 ease-out ml-1 font-bold text-slate-700 flex items-center '>
                                <p className='font-bold text-slate-500'>Live code</p>
                                <div className='items-center flex justify-evenly space-x-5 pb-1' >

                                    {
                                        language.Javascript === 'Javascript' &&
                                        <BiLogoJavascript size={38} color='orange' />
                                    }

                                    {
                                        language.Python === 'Python' &&
                                        <BiLogoPython size={38} color='orange' />
                                    }

                                    {
                                        language.Go === 'Go' &&
                                        <BiLogoGoLang size={45} color='blue' />
                                    }

                                    {
                                        language.Java === 'Java' &&
                                        <BiLogoJava size={38} color='red' />

                                    }

                                    <Select style={{ fontSize: '14px', height: '28px', paddingLeft: '12px', width: '100px', paddingRight: '10px' }} onChange={handleOption} size={30} >
                                        <option value='Java'>
                                            Java
                                        </option>
                                        <option value='Go'>
                                            Go
                                        </option>
                                        <option value='Javascript'>
                                            Javascript
                                        </option>
                                        <option value='Python'>
                                            Python
                                        </option>
                                    </Select>

                                </div>

                            </div>
                            <div className='h-8 w-full pb-2 flex justify-end items-center space-x-4 px-4 bg-slate-50'>
                                <BiFullscreen
                                    onClick={handleFullScreen2}
                                    className='border-2 hover:cursor-pointer transition-all duration-150 ease-out border-slate-200 p-[1px]' size={26} />
                                <FiMoon className='border-2 hover:cursor-pointer transition-all duration-150 ease-out border-slate-200 p-1' size={26} />
                                <span onClick={run} className='bg-blue-600 hover:cursor-pointer transition-all duration-150 ease-out px-1 font-thin text-white flex items-center '>
                                    Run
                                    <VscDebugStart size={17} color='white' />
                                </span>
                            </div>
                        </div>

                        <div ref={fullScreenElem2} >
                            <CodemirrorEditor
                                socket={socket}
                                roomId={roomId}
                                onCodeChange={
                                    (code) => {
                                        console.log({ code })
                                        codeRef.current = code;
                                    }}
                            />
                        </div>

                    </div>

                    <div className='bg-gray-700 border-l-[1px] border-slate-400 w-1/2'>
                        <div className='h-8 flex justify-around  w-full bg-slate-50'>
                            <p className='text-orange-500 text-xl font-extrabold italic w-full text-center'>Live Interview</p>
                            <BiFullscreen
                                onClick={handleFullScreen}
                                className='border-2 mx-4 hover:cursor-pointer transition-all duration-150 ease-out border-slate-200 p-[1px]' size={26} />

                        </div>

                        <div
                            ref={fullScreenElem}
                            className='h-1/2 relative  pr-1 flex space-x-1 overflow-hidden w-full py-5 bg-black'>
                            {
                                clients?.map(client => (
                                    <div className="w-1/2 h-[48%] border-r-[1px] border-slate-400  flex justify-center items-center relative p-4 ">
                                        {/* <Avatar size={'2xl'} name='Ryan Florence' src='https://bit.ly/ryan-florence' /> */}
                                        <div className='w-full h-full'>
                                            <audio id="remoteAudio"
                                                autoPlay
                                                playsInline
                                                ref={(instance) => {
                                                    provideRef(
                                                        {
                                                            instance,
                                                            clientId: client._id,
                                                            instanceType: 'audio'
                                                        });
                                                }}
                                            />
                                            <video id="remoteVideo"
                                                // className="w-full h-full"
                                                width={document.fullscreenElement ? '600px' : '500px'}
                                                height={document.fullscreenElement ? '600px' : '500px'}
                                                autoPlay
                                                playsInline
                                                ref={(instance) => {
                                                    provideRef(
                                                        {
                                                            instance,
                                                            clientId: client._id,
                                                            instanceType: 'video'
                                                        });
                                                }}
                                            />
                                        </div>

                                        <div className='
                                        absolute bottom-4 right-0 w-full  
                                        flex py-3 px-6 mt-auto justify-between items-center'>
                                            {/* <VideoRoomBottomControllers
                                                isMute={'true'}
                                                client={'56588998'}
                                                handleToggleMic={() => { }} /> */}
                                        </div>
                                    </div>

                                ))
                            }




                            <div className="w-1/2 h-[88%]  border-slate-300  flex justify-center items-center relative p-4 bg-black">
                                <Avatar size={'2xl'} name='Ryan Florence' src='https://bit.ly/code-beast' />
                                <div className='absolute bottom-4 right-0 w-full  flex py-3 px-6 mt-auto justify-between items-center'>
                                    {/* <VideoRoomBottomControllers
                                        isMute={'true'}
                                        client={'56588998'}
                                        handleToggleMic={() => { }} /> */}
                                </div>
                            </div>






                            <div className='absolute bottom-3 hover:cursor-pointer right-4 flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 '>
                                <p className='text-white font-bold text-2xl '> +<span className='text-2xl'>3</span></p>
                            </div>

                        </div>

                        <div className='h-1/2 w-full  bg-gray-300'>
                            <div className='flex justify-between px-3 border-slate-400 border-b-[1px] w-full'>
                                <div className='h-7 m-1 p-1 border-gray-400'>
                                    <p>Output :</p>
                                </div>
                                <span onClick={handleToggleMediaType} className='border-orange-600 border-2 mb-1 h-6 
                              mt-3 hover:cursor-pointer transition-all  font-medium duration-150 ease-out px-1 
                               text-orange-600 flex items-center '>
                                    Toggle Camera
                                </span>
                            </div>

                            <div className='text-sm pt-3 px-4'>
                                {
                                    output?.success ?
                                        output?.output?.split('/n')?.map(val => (
                                            <p>{val.replace('/n', '')}</p>
                                        ))
                                        :
                                        output?.error?.split('/n')?.map(val => (
                                            <p>{val.replace('/n', '')}</p>
                                        ))

                                }
                                <p></p>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>


    );
};

