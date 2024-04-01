import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsMic, BsMicMute } from "react-icons/bs";

export const BottomPeerControllers = ({ isMute, size, client, handleToggleMic }:any) => (
    <>
        {isMute ? (
            <BsMic
                onClick={handleToggleMic(client?._id)}
                size={size || 26} color='white'
                className='hover:cursor-pointer hover:scale-105 transition-all duration-150 ease-out' />

        ) : (
            <BsMicMute
                onClick={handleToggleMic(client?._id)}
                size={size || 26} color='white'
                className='hover:cursor-pointer hover:scale-105 transition-all duration-150 ease-out' />
        )}
        <BiDotsVerticalRounded
            size={size || 28}
            className='hover:bg-slate-800 rounded-full transition-all duration-150 ease-out hover:cursor-pointer'
            color='white' />
    </>
)