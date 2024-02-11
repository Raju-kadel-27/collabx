import "./styles.css";
import {
    Avatar,
    AvatarBadge,
    Divider,
    Heading,
    Spinner,
    useToast
} from "@chakra-ui/react";
import { textChatSelector } from "../redux/slices/ChatSlice";
import ScrollableChat from "./ScrollableChat";
import { getSender, getSenderFull } from "../helpers/ChatLogics";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdCall } from 'react-icons/md';
import { FiVideo } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineSchedule } from 'react-icons/ai';
import { useNavigate } from "react-router";
import { tokenSelector, userSelector } from "../../authentication/redux/slices/userSlice";
import { MessageInput } from "./MessageInput";
import { ModalChat } from "./Modal";
import { useSendMessageMutation } from "../redux/apis/messageApiSlice";
import { SignalingManager } from "@/features/websocket/SignalingManager";
// import { getSocket } from "../../../../shared/helpers/socket";

interface Msgpayload {
    type: 'CHAT_MESSAGE';
    payload: {
        room: string;
        type: 'INDIVIDUAL' | 'GROUP';
        messages: [
            {
                client_generated_uuid: string;
                user1_last_read_message: string;
                user2_last_read_message: string;
                publicKey: string;
                sender: string;
                message: string;
                messageKind: string;
            }
        ]
    }
}

interface IMessageInput {
    client_generated_uuid: string;
    chat: string;
    room: string;
    type: string;
    content: string;
    user1_last_read_message: string;
    user2_last_read_message: string;
    publicKey: string;
    sender: string;
}

export const SingleChat = () => {
    const navigateTo = useNavigate()
    const { selectedChat } = useSelector(textChatSelector);
    const user = useSelector(userSelector);
    const jwtToken = useSelector(tokenSelector);
    const toast = useToast();
    const [sendMessage] = useSendMessageMutation();

    const [loading, _setLoading] = useState<boolean>(false);
    const [newMessage, setNewMessage] = useState("");
    const [openModal, setModal] = useState(false);

    var peerUser = null;

    console.log({ user, jwtToken });
    console.log('CONNECTED USERS : ::smile');

    // useEffect(() => {
    //     SignalingManager
    //         .getInstance()
    //         .updateUuid(user._id, jwtToken)

    //     setTimeout(() => {
    //         console.log('###############');
    //         console.log('####Sending message in timeout function');
    //         console.log('##########');

    //         SignalingManager
    //             .getInstance()
    //             .send({
    //                 type: 'CHAT_MESSAGE',
    //                 payload: {
    //                     room: '65aaaec7728f122039d1c106',
    //                     // room: selectedChat._id,
    //                     type: 'INDIVIDUAL',
    //                     messages: [
    //                         {
    //                             client_generated_uuid: `${Math.floor(Math.random() * 1224)}65ab429d9640fa543fd77301`,
    //                             user1_last_read_message: '65ab429d9640fa543fd77301',
    //                             user2_last_read_message: '65ab429d9640fa543fd77301',
    //                             publicKey: '65ab429d9640fa543fd77301',
    //                             sender: user._id,
    //                             message: `New message from ${Math.random()}`,
    //                             messageKind: 'text'
    //                         }
    //                     ]
    //                 }
    //             }
    //             );
    //     }, 10000)

    //     console.log('Signaling Manager is initialized.');
    // }, [])

    useEffect(() => {
        let messageId = ""

        SignalingManager
            .getInstance()
            .updateUuid(user._id, jwtToken)

        setTimeout(() => {
            console.log('###############');
            console.log('####Sending message in timeout function');
            console.log('##########');

            SignalingManager
                .getInstance()
                .send({
                    type: 'DELETE_MESSAGE',
                    payload: {
                        room: '65aaaec7728f122039d1c106',
                        type: 'INDIVIDUAL',
                        messageId: ''

                    }
                }
                );
        }, 10000)

        console.log('Signaling Manager is initialized.');
    }, [])


    if (selectedChat) {
        peerUser = getSenderFull(user, selectedChat?.users)
    };

    console.log('Some error occured inside signaling manager');

    const handleSendMessage = async (event: any) => {
        console.log(event.key, "event.key");
        let newMessage = 'Raju low wipro'
        if (event.key === "Enter" && newMessage) {
            try {
                console.log('### SignalingManager Instance ###');
                console.log(SignalingManager.getInstance());
                SignalingManager
                    .getInstance()
                    .send({
                        type: 'CHAT_MESSAGE',
                        payload: {
                            room: selectedChat._id,
                            type: 'INDIVIDUAL',
                            messages: [
                                {
                                    client_generated_uuid: `${Math.floor(Math.random() * 1224)}65ab429d9640fa543fd77301`,
                                    user1_last_read_message: '65ab429d9640fa543fd77301',
                                    user2_last_read_message: '65ab429d9640fa543fd77301',
                                    publicKey: '65ab429d9640fa543fd77301',
                                    sender: user._id,
                                    message: newMessage,
                                    messageKind: 'text'
                                }
                            ]
                        }
                    }
                    );

                console.log('Sent message through signaling manager;')
                // const response = await sendMessage(payload);
                // console.log({ response });
            } catch (error) {
                console.log({ error });
                setNewMessage('');
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };

    const handleEmoji = (e: any) => {
        console.log('Handling emojis..here');
        let sym = e.unified.split("-");
        let codesArray: any = [];
        sym.forEach((el: any) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        console.log({ emoji }, 'Emojis---value are rendered here in the picker component...')
        setNewMessage(newMessage + emoji);
    };

    const typingHandler = (e: any) => {
        //     setNewMessage(e.target.value);

        //     if (!socketConnected) return;

        //     if (!typing) {
        //         setTyping(true);
        //         // socket.emit("typing", selectedChat._id);
        //     }
        //     let lastTypingTime = new Date().getTime();
        //     var timerLength = 3000;
        //     setTimeout(() => {
        //         var timeNow = new Date().getTime();
        //         var timeDiff = timeNow - lastTypingTime;
        //         if (timeDiff >= timerLength && typing) {
        //             // socket.emit("stop typing", selectedChat._id);
        //             setTyping(false);
        //         }
        //     }, timerLength);
    };

    const handleMakeCall = () => {
        // console.log({ peerUser })
        // socket.emit(ACTIONS.CREATE_RINGING_FOR_DUAL, { receiverId: peerUser._id, caller: user })
        navigateTo(`/112233`)
    }
    return (
        <>
            {selectedChat ? (
                <div className='relative h-full overflow-y-auto'>
                    <div className="pb-3 pt-2 px-2 w-full text-[28px] md:text-[30px] flex justify-between space-x-5 items-center ">
                        <div className="flex  justify-start space-x-4 items-center">
                            <Avatar
                                name="M"
                                bg={'pink.400'} >
                                <AvatarBadge boxSize='0.85em' bg='green.500' />
                            </Avatar>

                            <Heading
                                color={'gray.600'}
                                size={'md'}>
                                {getSender(user, selectedChat.users)}
                            </Heading>

                        </div>
                        <div className="flex justify-center items-center space-x-6 pr-5">

                            <AiOutlineSchedule
                                onClick={() => setModal(true)}
                                size={24}
                                color='red'
                                className="hover:cursor-pointer  transition-all duration-150 ease-out"
                            />
                            <MdCall
                                onClick={handleMakeCall}
                                size={24}
                                color='green'
                                className="hover:cursor-pointer  transition-all duration-150 ease-out"
                            />
                            <FiVideo
                                size={24}

                                color="green"
                                className="hover:cursor-pointer font-semibold bg-slate-50  transition-all duration-150 ease-out"
                            />
                            <BsThreeDotsVertical
                                size={24}
                                color="gray"
                                className="hover:cursor-pointer  transition-all duration-150 ease-out"
                            />
                        </div>
                    </div>
                    <Divider />
                    <div
                        className="flex px-16 flex-col h-[calc(100vh-183px)] overflow-y-auto flex-end p-3 bg-white w-full rounded-lg"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className="w-full">
                                {/* <ScrollableChat /> */}
                            </div>
                        )}
                        <div
                            className="bg-slate-50 mt-[-80px] absolute w-[80%] mx-auto bottom-4  p-4 rounded-sm "
                            onKeyDown={handleSendMessage}
                            id="first-name"
                        >
                            <MessageInput
                                handleEmoji={handleEmoji}
                                newMessage={newMessage}
                                typingHandler={typingHandler}
                            />

                        </div>
                    </div>
                </div>
            )
                :
                (
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-lg text-lg font-lato font-bold">Error</p>
                        <p className="text-red-500 font-lato  text-sm">Some error occured while loading</p>
                    </div>
                )}
            {
                openModal
                &&
                <ModalChat
                    setModal={setModal}
                    isOpen={openModal} />
            }
        </>
    );
};

