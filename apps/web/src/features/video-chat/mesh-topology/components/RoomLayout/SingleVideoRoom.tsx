import { useSelector } from "react-redux"
import { AvatarView } from "../AvatarView/AvatarView"
import { BottomPeerControllers } from "../BottomPeerController/BottomPeerController"
import { VideoAudioElem } from "../VideoAudioElem/VideoAudioElem"
import { bottomScreenControllerSelector } from "../../redux/slices/BottomScreenController"

export const SingleVideoRoom = ({ isMute, clients, provideRef, handleToggleMic }:any) => {
    // const {  } = useSelector(bottomScreenControllerSelector, (prev,next) => prev === next);
    const isVideo = true
    if (!clients.length) return
    console.log({ clients }, 'checking clients')
    return (
        <div className={`{flex h-screen w-96 pb-[80px] bg-gray-800 transition-all duration-700 ease-out}`}>
            {isVideo ?
                (
                    <div className="w-full relative p-4 bg-black">
                        <VideoAudioElem
                            client={clients[0]}
                            provideRef={provideRef} />

                        <div className='absolute bottom-4 right-0 w-full flex py-3 px-6 mt-auto justify-between items-center'>
                            <BottomPeerControllers
                                isMute={isMute}
                                client={clients[0]}
                                handleToggleMic={handleToggleMic} />
                        </div>
                    </div>
                )
                :
                (
                    <div className="w-full h-full flex justify-center items-center relative p-4 bg-gray-700">
                        <AvatarView size={20} client={clients[0]} />
                        <div className='absolute bottom-4 right-0 w-full  flex py-3 px-6 mt-auto justify-between items-center'>
                            <BottomPeerControllers
                                isMute={isMute}
                                client={clients[0]}
                                handleToggleMic={handleToggleMic} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}