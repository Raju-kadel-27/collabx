import React from 'react'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router'

export const RecordingList = () => {
    const navigateTo = useNavigate();
    const { roomId } = useParams();

    return (
        <div onClick={() => navigateTo(`/create-classroom/room/${roomId}/player`)} className='flex my-4 hover:bg-slate-50 hover:cursor-pointer p-1 justify-between w-full'>
            <div className='flex justify-start space-x-3 mx-10'>
                <BsFillPlayCircleFill size={24} color='green' />
                <p>Introduction to programming.mp4</p>
            </div>
            <div className='flex font-light flex-grow justify-between space-x-6 items-center'>
                <p> Recorded on : 2022-09-12 </p>
                <p>Duration: 56 mins</p>
                <p>156 mb </p>
            </div>
        </div>
    )
}
