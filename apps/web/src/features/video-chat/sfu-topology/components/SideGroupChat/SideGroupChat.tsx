import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getSenderFull } from "../../../../text-chat/helpers/ChatLogics";
import ScrollableChat from "../../../../text-chat/components/ScrollableChat";

import { getSocket } from '../../../../../../shared/helpers/SocketInit';
import { userSelector } from "../../../../authentication/redux/slices/userSlice";
import { textChatSelector } from "../../../../text-chat/redux/slices/ChatSlice";
import { sendMessageCallback } from '../../hooks/useSFUTopology';
import { channelMessageSelector } from "../../redux/slices/ChannelMessage";

import { BsMicFill } from 'react-icons/bs';
import { GoFileMedia } from 'react-icons/go';
import { BsEmojiSmile } from 'react-icons/bs';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';
import {
    Spinner,
    useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

var selectedChatCompare:any=null;

let testMsg = [
    {
        _id: 'sdsd2',
        sender: { _id: '23232', name: 'Rocky Vai', email: 'raju@gmail.com', pic: 'https://avatar.com/332323' },
        content: 'Where are you right now ??',
    },

    {
        _id: '564523',
        sender: { _id: 564523, name: 'Rocky Vasji', email: 'rajcu@gmail.com', pic: 'https://avatar.com/332323' },
        content: 'I am in Birtamode-01, Jhapa',
    },

    {
        _id: 'sdsd2',
        sender: { _id: '23a232', name: 'Rocky Vasi', email: 'rajau@gmail.com', pic: 'https://avatar.com/332323' },
        content: 'Doing anything else right now..',
    },

    {
        _id: '564523',
        sender: { _id: 5645523, name: 'Rocky Vaisk', email: 'rasju@gmail.com', pic: 'https://avatar.com/332323' },
        content: 'okay, lets learn this concept.',
    }
]


export const SideGroupChat = () => {
    const { messages } = useSelector(channelMessageSelector, shallowEqual);
    const navigateTo = useNavigate();
    const socket = getSocket();
    const [messagess, setMessages] = useState(testMsg);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const toast = useToast();
    const { sendChatMessage } = sendMessageCallback()

    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: '',
        // animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const { selectedChat, notification } = useSelector(textChatSelector, (prev, next) => prev === next);
    const user = useSelector(userSelector, (prev, next) => prev === next);

    var peerUser = null
    if (selectedChat) {
        peerUser = getSenderFull(user, selectedChat?.users)
    }
    const dispatch = useDispatch()

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true);
            const { data } = await axios.get(
                `http://localhost:5000/api/message/${selectedChat._id}`,
                config
            );
            setMessages(data);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "http://localhost:5000/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat,
                    },
                    config
                );
                console.log({ data })
                socket.emit("new message", data);
                setMessages([...messages, data]);

            } catch (error) {
                console.log({ error })
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

    useEffect(() => {

        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        // eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     fetchMessages();
    //     selectedChatCompare = selectedChat;
    // }, [selectedChat]);

    // useEffect(() => {
    //     console.log('called receivermsghandler---useeffect')
    //     channelMessageHandler(connections);
    // }, [connections]);

    useEffect(() => {

        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                if (!notification.includes(newMessageRecieved)) {
                    // setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        })

    }, []);

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;

        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    const handleMakeCall = () => {
        console.log({ peerUser })
        // socket.emit(ACTIONS.CREATE_RINGING_FOR_DUAL, { receiverId: peerUser._id, caller: user })
        navigateTo(`/112233`)
    }

    return (
        <div
            className="flex h-[calc(100vh-103px)] overflow-hidden py-3 w-full"
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
                <div className="overflow-hidden">
                    <ScrollableChat messages={messages} />
                </div>
            )}

            <div
                className="absolute w-full  space-x-2 justify-start items-center left-0 bottom-0  px-3  rounded-sm "
                onKeyDown={sendMessage}
                id="first-name"
            >

                <div className="flex justify-between items-center">
                    <input onChange={handleChange} value={message} placeholder="Type your message.." className="bg-slate-700 w-full mr-4 text-slate-300 rounded-full text-sm border-none outline-none p-2 px-4" type="text" />
                    <IoMdSend
                        onClick={() => sendChatMessage(message)}
                        size={28} color="gray" />
                </div>

                <div className="flex space-x-6 justify-start my-3">
                    <BsMicFill className="hover:cursor-pointer" size={20} color="gray" />
                    <AiOutlineCamera size={20} color="gray" />
                    <BsEmojiSmile size={20} color="yellow" />
                    <GoFileMedia size={20} color="green" />
                </div>

            </div>
        </div>
    );
};

