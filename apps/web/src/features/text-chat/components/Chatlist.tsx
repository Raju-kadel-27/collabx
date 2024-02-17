import AvatarStatus from '../AvatarStatus/AvatarStatus'
import { Divider } from '@chakra-ui/react'
import { getSender, getSenderFull } from "../../config/ChatLogics"
import { useSelector } from 'react-redux'

const Chatlist = ({ chat }) => {

    const { onlineUsers, chatSystem: { selectedChat, user } } = useSelector(state => state.socket)
    const peerUser = getSenderFull(user, chat?.users)
    const onlineStatus = onlineUsers.includes(peerUser?._id) ? 'online' : 'offline'
    const chatWithStatus = { ...chat, onlineStatus }

    return (
        <>
            <div
                className=
                {`w-full hover:bg-slate-200 hover:cursor-pointer flex py-3 px-2 space-x-7 
                ${chatWithStatus === selectedChat ? 'bg-slate-100' : 'bg-white'} p-2`}>

                <div>
                    <AvatarStatus onlineStatus={chatWithStatus.onlineStatus} />
                </div>

                <div className='mr-auto'>
                    <h2 className='text-md text-gray-700 font-semibold'>
                        {!chatWithStatus?.isGroupChat
                            ? getSender(user, chatWithStatus?.users)
                            : chatWithStatus?.chatName
                        }
                    </h2>

                    {
                        chatWithStatus.latestMessage
                        &&
                        (
                            <p className='text-gray-400 text-xs mt-2'>
                                <span className='text-gray-500'>{chatWithStatus.latestMessage.sender.name} : </span>
                                {
                                    chatWithStatus
                                        .latestMessage
                                        .content
                                        .length > 50
                                        ? chatWithStatus.latestMessage.content.substring(0, 51) + "..."
                                        : chatWithStatus.latestMessage.content
                                }
                            </p>
                        )
                    }
                </div>
            </div>
            <Divider />
        </>
    )
}

export default Chatlist




