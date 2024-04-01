import React, { useEffect, useState } from 'react'
import {
    BiSolidPhoneCall
} from 'react-icons/bi';
import {
    BiUserCircle
} from 'react-icons/bi';
import myAudioFile from "./ring.mp3"
// import useSocket from "./hooks/socket/useSocket"
import { useDispatch, useSelector } from 'react-redux';
import { handleRinging, handleVideoRoom } from './features/video/VideoSlice';
import { useNavigate } from 'react-router';
// const RingingCall = ({ setIsCreateOffer, socket, setShowRing, setIsMakeCall, peerClients }) => {

const RingingCall = () => {
    const navigateTo = useNavigate()
    const dispatch = useDispatch()
    const { showRinging: shouldPlayAudio, caller, meetingRoomId } = useSelector(state => state.socket)

    const handleAnswerCall = () => {
        // console.log(peerClients?.socketId, 'peerClient.socketId')
        // socket.current.emit("make_caller_emit_join", { peerSocketId: peerClients.socketId })
        // setIsMakeCall(true)
        // socket.current.emit(ACTIONS.CREATE_RINGING, { receiver: peerUser, caller: currentUser })
        // dispatch(handleVideoRoom(true))
        navigateTo(`/${meetingRoomId}`)
    }

    const handleReject = () => {
        dispatch(handleRinging(false))
    }
    useEffect(() => {
        if (shouldPlayAudio) {
            const audioElement = document.getElementById('audioElement');
            if (audioElement && audioElement.paused) {
                audioElement.play();
            }
        }
    }, [shouldPlayAudio]);

    const videoUrl = 'https://youtu.be/MBXs2shxlvM?autoplay=1'
    return (
        <div className='h-screen  w-full pl-10 flex justify-center items-center'>
            <audio loop id="audioElement" controls autoPlay style={{ display: 'none' }}>
                <source src={myAudioFile} type="audio/mpeg" />
            </audio>

            <div className='p-3 bg-slate-800 rounded-2xl w-[40vw] pb-8'>
                <div className='mt-16 w-full flex flex-col justify-center   mx-auto ml-20' >
                    <BiUserCircle color='cyan' size={92} />
                    <p className='font-bold ml-[-25px] text-slate-400'>{caller?.userName || 'Raju kadel'} is calling you...</p>

                    <div className='flex justify-start ml-5 space-x-1  items-center'>
                        <div className='my-6 h-4  rounded-full animate-bounce w-4 bg-green-600'></div>
                        <div className=' h-4 rounded-full  animate-pulse  w-4 bg-green-600'></div>
                        <div className=' h-4 rounded-full animate-bounce w-4 bg-green-600'></div>
                    </div>

                </div>

                <div className='flex justify-around mt-16 items-end transition-all duration-150 ease-out'>
                    <div
                        onClick={handleAnswerCall}
                        className='flex hover:cursor-pointer hover:bg-green-500 bg-slate-600 p-2 rounded-lg '>
                        <BiSolidPhoneCall className='hover:text-white' size={32} color='green' />
                        <span className='mx-3 mt-1 font-bold text-slate-300'>Accept</span>
                    </div>

                    <div onClick={handleReject} className='flex hover:cursor-pointer hover:bg-red-500 transition-all duration-150 ease-out bg-slate-600 p-2 rounded-lg '>
                        <BiSolidPhoneCall size={32} color='red' />
                        <span className='mx-3 mt-1 font-bold text-slate-300'>Reject</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RingingCall