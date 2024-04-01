import { AvatarView } from '@/features/video-chat/mesh-topology/components/AvatarView/AvatarView'
import { BottomPeerControllers } from '../BottomPeerControllers/BottomPeerControllers'
import { VideoAudioElem } from '../VideoAudioElem/VideoAudioElem'

const SmallRoom = ({
    isMute,
    client,
    provideRef,
    handleToggleMic
}:any) => {
    const isVideo = true
    return (
        <>
            {
                isVideo ?
                    (
                        <div className='bg-gray-700 hover:cusor-pointer transition-all duration-300 ease-out flex flex-col justify-between h-[600px] opacity-50  rounded-lg ' >
                            <VideoAudioElem
                                client={client}
                                muted={false}
                                provideRef={provideRef} />

                            <div className='absolute bottom-4 right-0 w-full  flex py-3 px-6 mt-auto justify-between items-center'>
                                <BottomPeerControllers
                                    client={client}
                                    handleToggleMic={handleToggleMic}
                                    isMute={isMute}
                                    size={22} />
                            </div>
                        </div >
                    ) : (
                        <div className='bg-gray-700 w-full relative hover:cusor-pointer transition-all duration-300 ease-out flex items-center justify-center h-[300px] rounded-lg '>
                            <AvatarView client={client} size='xl' />
                            <div className='absolute bottom-4 right-0 w-full  flex py-3 px-6 mt-auto justify-between items-center'>
                                <BottomPeerControllers
                                    client={client}
                                    handleToggleMic={handleToggleMic}
                                    isMute={isMute}
                                    size={20} />
                            </div>
                        </div>
                    )
            }
        </>
    )
}


const MultipleRooms = ({ isWhiteBoardOpen, clients, provideRef, handleToggleMic }:any) => {
    return (
        <div 
        className={`{ ${isWhiteBoardOpen? 'invisible':'visible'} grid grid-cols-4 gap-y-1 gap-x-1 justify-center px-20 place-content-start z-50 my-auto pt-4 w-full flex-wrap bg-gray-900 h-full}`}>

            {
                clients?.map((client:any, i:any) => (
                    <div key={i}>
                        <SmallRoom
                            isMute={true}
                            client={client}
                            provideRef={provideRef}
                            handleToggleMic={handleToggleMic}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default MultipleRooms