// react-icons
import { FaHandPaper } from "react-icons/fa"
import { TbScreenShare } from "react-icons/tb"
import { MdOutlineLocationOn } from "react-icons/md"
import { LiaChalkboardTeacherSolid } from "react-icons/lia"
import { AiFillCodeSandboxCircle } from "react-icons/ai"
import { BiSolidPhoneCall } from 'react-icons/bi';
import { PiChatCircleDotsLight } from 'react-icons/pi';
import { BsFillRecordCircleFill } from 'react-icons/bs';
import { BsMic } from 'react-icons/bs';
import { LuCake } from 'react-icons/lu';
import { BiSolidEdit } from 'react-icons/bi';

import { useNavigate } from 'react-router'
import Editor from './Editor'
// import {DocsEditor} from './DocsEditor'
import { Avatar, AvatarGroup } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { handleRightDrawer } from '../features/video/VideoSlice';
import Birthday from '../components/Birthday';
// import Map from '../components/Map'

import { handleCamera, handleMedia, handleRecording } from '../../src/features/video/VideoSlice';
import { useState } from 'react';
import { MEDIA__TYPE } from '../actions/actions';
import {
    Input,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import {
    FourVideoRoom,
    MoreThanFourVideoRoom,
    SingleVideoRoom,
    ThreeVideoRoom,
    TwoVideoRoom
} from './SingleVideoRoom';
import { CanvasContainer } from "@/features/tabs/whiteboard-tab/components/CanvasContainer"

const AvatarGroupContent = () => {
    return (
        <AvatarGroup size='lg' max={5}>
            <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
            <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
            <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />

            <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
            <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

        </AvatarGroup>
    )
}

const BottomVideoController = (
    {
        raiseHand,
        showBirthday,
        showCodeEditor,
        showDocsEditing,
        showWhiteBoard,
        showPeerTracking,
        setRaiseHand,
        setShowBirthday,
        setShowCodeEditor,
        setShowDocsEditing,
        setShowWhiteBoard,
        setShowPeerTracking,
        handleToggleMic
    }: any
) => {
    const navigateTo = useNavigate()
    const dispatch = useDispatch()
    const {
        openRightDrawer,
        media,
        recording,
        chatSystem: { user }
    } = useSelector(state => state.socket)

    const handleEndCall = () => navigateTo('/dashboard')

    const ToggleLocalAudio = () => handleToggleMic(user?._id)

    const handleRaiseHand = () => {
        setRaiseHand(prev => !prev)
    }
    const handleShowBirthday = () => {
        setShowBirthday(prev => !prev)
    }
    const handleCodeEditor = () => {
        setShowCodeEditor(prev => !prev)
    }
    const handleDocsEditing = () => {
        setShowDocsEditing(prev => !prev)
    }
    const handleWhiteBoard = () => {
        setShowWhiteBoard(prev => !prev)
    }
    const handlePeerTracking = () => {
        setShowPeerTracking(prev => !prev)
    }

    const handleToggleMediaType = () => {
        media.mediaType === 'camera' ?
            dispatch(handleMedia({
                mediaType: MEDIA__TYPE.SCREEN__SHARE,
                isFirstConnection: false
            })) :
            dispatch(handleCamera({
                isFirstConnection: false,
                mediaType: MEDIA__TYPE.CAMERA
            }))
    }

    const handleRecording = () => {
        recording.isRecording ?
            dispatch(handleRecording({ isRecording: false, stopNow: true }))
            :
            dispatch(handleRecording({ isRecording: true, stopNow: false }))

    }

    const handleLiveChat = () => {
        dispatch(handleRightDrawer(!openRightDrawer))
    }

    return (
        <div className='h-20 bg-black flex z-50 justify-between items-center absolute bottom-0 w-full'>
            <div className='relative flex space-x-8 items-center px-4 justify-center'>
                <div onClick={handleRaiseHand} title='Raise Hand' className='relative flex flex-col hover:rounded-full hover:scale-105 items-center hover:cursor-pointer justify-center'>
                    <FaHandPaper size={32} color={`${raiseHand ? 'rgb(234 179 8)' : 'gray'}`} />
                </div>
                <div onClick={handleShowBirthday} title='Raise Hand' className='relative flex flex-col hover:rounded-full hover:scale-105 items-center hover:cursor-pointer justify-center'>
                    <LuCake size={32} color={`${showBirthday ? 'yellow' : 'gray'}`} />
                </div>
                <div onClick={ToggleLocalAudio} title='Raise Hand' className='relative flex flex-col hover:rounded-full hover:scale-105 items-center hover:cursor-pointer justify-center'>
                    <BsMic size={32} />
                </div>

                <div onClick={handleToggleMediaType} title={`${media.mediaType === 'camera' ? 'Share Screen' : 'Switch to Camera'}`} className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800 items-center hover:cursor-pointer justify-center'>
                    <TbScreenShare size={35} color={`${media.mediaType === 'camera' ? 'white' : 'green'}`} />
                </div>

                <div onClick={handlePeerTracking} title='Realtime Tracking' className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <MdOutlineLocationOn size={35} color={`${showPeerTracking ? 'red' : 'gray'}`} />
                </div>

                <div onClick={handleDocsEditing} title='Open Docs Editor' className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <BiSolidEdit size={35} color={`${showDocsEditing ? 'white' : 'gray'}`} />
                </div>
                <div onClick={handleRecording} title='Realtime Tracking' className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <BsFillRecordCircleFill size={35} color={`${showPeerTracking ? 'red' : 'gray'}`} />
                </div>

                <div onClick={handleWhiteBoard} title='Open Whiteboard' className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <LiaChalkboardTeacherSolid size={35} color={`${showWhiteBoard ? 'white' : 'gray'}`} />
                </div>
                <div onClick={handleCodeEditor} title='Open Code Editor' className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <AiFillCodeSandboxCircle size={36} color={`${showCodeEditor ? 'purple' : 'gray'}`} />
                </div>
                <div
                    onClick={handleLiveChat}
                    title='Start Chat' className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <PiChatCircleDotsLight size={36} color={`${openRightDrawer ? 'pink' : 'gray'}`} />
                </div>
            </div>

            <div className='flex justify-around opacity-90 mr-16 space-x-2 px-4 items-center transition-all duration-150 ease-out'>
                <div onClick={handleEndCall} className='flex hover:cursor-pointer bg-red-600 transition-all duration-200 ease-out hover:bg-red-500 p-2 rounded-full '>
                    <BiSolidPhoneCall size={32} color='white'
                    />
                    <span className='mx-3 mt-1 font-bold text-slate-200'>End Call</span>
                </div>
            </div>
            <AvatarGroupContent />
        </div>
    )
}


function DrawerExample() {
    const dispatch = useDispatch()
    const { openRightDrawer } = useSelector(state => state.socket)
    const handleLiveChat = () => {
        dispatch(handleRightDrawer(!openRightDrawer))
    }

    return (
        <>
            <Drawer
                isOpen={openRightDrawer || false}
                placement='right'
            >
                <DrawerOverlay />
                <DrawerContent className='blur-sm shadow-lg ' opacity={0.55}>
                    <DrawerCloseButton onClick={handleLiveChat} />
                    <DrawerHeader>Create your account</DrawerHeader>
                    <DrawerBody>
                        <Input placeholder='Type here...' />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

const ShowPeerTracking = ({ setShowPeerTracking }) => {
    return (
        <div className='absolute top-0 bottom-0 right-0 z-40 w-screen h-screen overflow-hidden justify-center items-center'>
            <Map setShowPeerTracking={setShowPeerTracking} />
        </div>
    )
}
const WishBirthday = () => {
    return (
        <div className='absolute top-0 bottom-0 right-0 z-40 bg-black w-screen h-screen overflow-hidden justify-center items-center'>
            <Birthday />
            {/* <Congratulations setWishBirthday={setWishBirthday}/> */}
        </div>
    )
}

const ShowWhiteBoard = () => {
    return (
        <div className='absolute top-0 bottom-0 right-0 z-40 bg-slate-50 w-screen h-screen overflow-hidden justify-center items-center'>
            <CanvasContainer />
        </div>
    )
}

const VideoScreen = ({ provideRef, handleToggleMic, peerClientsOnly, isMute }) => {

    const [showPeerTracking, setShowPeerTracking] = useState(false)
    const [showBirthday, setShowBirthday] = useState(false)
    const [showWhiteBoard, setShowWhiteBoard] = useState(false)
    const [raiseHand, setRaiseHand] = useState(false)
    const [showDocsEditing, setShowDocsEditing] = useState(false)
    const [showCodeEditor, setShowCodeEditor] = useState(false)
    const roomLength = peerClientsOnly?.length
    let RequiredRoomsLayout;
    console.log({ peerClientsOnly })
    // if (roomLength === 1)
    //     RequiredRoomsLayout =
    //         <SingleVideoRoom
    //             isMute={isMute}
    //             clients={peerClientsOnly}
    //             provideRef={provideRef}
    //             handleToggleMic={handleToggleMic} />

    // else if (roomLength === 2)
    //     RequiredRoomsLayout =
    //         <TwoVideoRoom
    //             isMute={isMute}
    //             clients={peerClientsOnly}
    //             provideRef={provideRef}
    //             handleToggleMic={handleToggleMic} />

    // else if (roomLength === 3)
    //     RequiredRoomsLayout =
    //         <ThreeVideoRoom
    //             isMute={isMute}
    //             clients={peerClientsOnly}
    //             provideRef={provideRef}
    //             handleToggleMic={handleToggleMic} />

    // else if (roomLength === 4)
    //     RequiredRoomsLayout =
    //         <FourVideoRoom
    //             isMute={isMute}
    //             clients={peerClientsOnly}
    //             provideRef={provideRef}
    //             handleToggleMic={handleToggleMic} />

    // else if (roomLength > 4)
    RequiredRoomsLayout =
        <MoreThanFourVideoRoom
            isMute={isMute}
            clients={peerClientsOnly}
            provideRef={provideRef}
            handleToggleMic={handleToggleMic} />

    return (
        <>
            <DrawerExample />

            {
                showPeerTracking
                &&
                <ShowPeerTracking setShowPeerTracking={setShowPeerTracking} />
            }

            {showWhiteBoard && <ShowWhiteBoard />}

            {showBirthday && <WishBirthday />}

            {showCodeEditor && <Editor />}

            {showDocsEditing && < DocsEditor />}

            {RequiredRoomsLayout}

            <BottomVideoController
                showPeerTracking={showPeerTracking}
                showBirthday={showBirthday}
                showWhiteBoard={showWhiteBoard}
                raiseHand={raiseHand}
                showDocsEditing={showDocsEditing}
                showCodeEditor={showCodeEditor}
                setRaiseHand={setRaiseHand}
                setShowBirthday={setShowBirthday}
                setShowCodeEditor={setShowCodeEditor}
                setShowDocsEditing={setShowDocsEditing}
                setShowWhiteBoard={setShowWhiteBoard}
                setShowPeerTracking={setShowPeerTracking}
                handleToggleMic={handleToggleMic}
            />
        </>
    );
};

export default VideoScreen;
