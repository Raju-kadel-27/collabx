import { FaHandPaper } from "react-icons/fa"
import { TbScreenShare } from "react-icons/tb"
import { MdOutlineLocationOn } from "react-icons/md"
import { LiaChalkboardTeacherSolid } from "react-icons/lia"
import { BsFillRecordCircleFill } from 'react-icons/bs';
import { BsMic } from 'react-icons/bs';
import { useSelector, useDispatch } from "react-redux"
import { MEDIA__TYPE, MESH__ACTIONS as ACTIONS } from "../../actions/actions"
import { useNavigate } from "react-router"
import {
    handleRaiseHand,
    handleWhiteBoard,
    handleLocationTracking,
    handleChat,
    ToggleCameraMode,
    bottomScreenControllerSelector,
} from "../../redux/slices/BottomScreenController"
import {getSocket} from '../../../../../../shared/helpers/SocketInit';
import { PiChatCircleDotsLight } from "react-icons/pi";

export const BottomScreenController = () => {
    const {
        isRaiseHand,
        isServerRecording,
        isWhiteBoardOpen,
        isLocationTrackingOn,
        isChatOpen,
        cameraMode
    } = useSelector(bottomScreenControllerSelector, (prev, next) => prev === next)

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const socket = getSocket();

    const handle_EndCall = () => navigateTo('/create-classroom')
    // const toggleLocalAudio = () => handleToggleMic()

    const handle_RaiseHand = () => {
        dispatch(handleRaiseHand())
    }

    const handle_WhiteBoard = () => {
        dispatch(handleWhiteBoard())
    }

    const handle_LocationTracking = () => {
        dispatch(handleLocationTracking())
    }

    const handle_Joys = (message: any) => {
        console.log({ message })
        socket.emit(ACTIONS.SEND__JOYS, { message })
    }

    const handle_CameraMode = () => {
        cameraMode === MEDIA__TYPE.CAMERA ?
            dispatch(ToggleCameraMode({
                cameraMode: MEDIA__TYPE.SCREEN__SHARE,
            })) :
            dispatch(ToggleCameraMode({
                cameraMode: MEDIA__TYPE.CAMERA
            }))
    }

    const handle_Recording = () => {
        // recording.isRecording ?
        // dispatch(handle_Recording({ isRecording: false, stopNow: true }))
        // :
        // dispatch(handle_Recording({ isRecording: true, stopNow: false }))
    }

    const handle_Chat = () => {
        dispatch(handleChat())
    }

    const handle_Mic = () => { }

    return (
        <div
            style={{ width: isChatOpen ? '' : '100%' }}
            className={`{h-20 bg-black flex z-50  absolute bottom-0 space-x-12 justify-around mb-4 items-center ${isChatOpen ? 'w-[calc(100vw-300px)]' : 'w-full'}}`}>

            <div className='relative flex space-x-4  z-50 ml-auto  w-fit items-center px-4 justify-center'>
                <div
                    onClick={handle_RaiseHand}
                    title='Raise Hand'
                    className='relative flex flex-col hover:rounded-full  items-center hover:cursor-pointer justify-center'>
                    <FaHandPaper size={24} color={`${isRaiseHand ? 'rgb(234 179 8)' : 'gray'}`} />
                </div>

                {/* <div
                    onClick={() => handle_Joys('BIRTHDAY')}
                    title='Raise Hand'
                    className='relative flex flex-col hover:rounded-full  items-center hover:cursor-pointer justify-center'>
                    <LuCake size={24} color={`${isWishReceived ? 'yellow' : 'gray'}`} />
                </div> */}

                {/* <div
                    onClick={() => handle_Joys('CONGRATULATIONS')}
                    title='Raise Hand'
                    className='relative flex flex-col hover:rounded-full  items-center hover:cursor-pointer justify-center'>
                    <LuCake size={24} color={`${isWishReceived ? 'yellow' : 'gray'}`} />
                </div> */}

                <div
                    onClick={handle_Mic}
                    title='Raise Hand'
                    className='relative flex flex-col hover:rounded-full  items-center hover:cursor-pointer justify-center'>
                    <BsMic size={24} color="gray" />
                </div>

                <div
                    onClick={handle_CameraMode}
                    title={`${MEDIA__TYPE.CAMERA === 'camera' ? 'Share Screen' : 'Switch to Camera'}`}
                    className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800 items-center hover:cursor-pointer justify-center'>
                    <TbScreenShare size={24} color={`${false === 'camera' ? 'white' : 'green'}`} />
                    {/* <TbScreenShare size={24} color={`${media.mediaType === 'camera' ? 'white' : 'green'}`} /> */}
                </div>

                <div
                    onClick={handle_LocationTracking}
                    title='Realtime Tracking'
                    className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <MdOutlineLocationOn size={24} color={`${isLocationTrackingOn ? 'red' : 'gray'}`} />
                </div>

                <div
                    onClick={handle_Recording}
                    title='Start Recording'
                    className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <BsFillRecordCircleFill size={24} color={`${!isServerRecording ? 'red' : 'gray'}`} />
                </div>

                <div
                    onClick={handle_WhiteBoard}
                    title='Open Whiteboard'
                    className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <LiaChalkboardTeacherSolid size={24} color={`${isWhiteBoardOpen ? 'white' : 'gray'}`} />
                </div>

                <div
                    onClick={handle_Chat}
                    title='Start Chat'
                    className='flex flex-col p-2 hover:rounded-full hover:bg-gray-800  items-center hover:cursor-pointer justify-center'>
                    <PiChatCircleDotsLight size={24} color={`${isChatOpen ? 'pink' : 'gray'}`} />
                </div>

            </div>

            <div className='flex mr-auto  justify-between opacity-90  space-x-2 px-4 items-center transition-all duration-150 ease-out'>
                <div
                    onClick={handle_EndCall}
                    className='flex hover:cursor-pointer bg-red-600 transition-all duration-200 ease-out hover:bg-red-500 p-2 rounded-full '>
                    <span className='mx-3 font-bold text-slate-200'>End Call</span>
                </div>
            </div>


        </div>
    )
}