// import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatLoading from "../../components/ChatLoading";
import { useSelector, useDispatch } from "react-redux";
import { handleChats, handleSelectedChat, handleUser } from "../../features/video/VideoSlice";
import Chatlist from "../Chatlist/Chatlist";

const Chats = () => {

    // const [loggedUser, setLoggedUser] = useState();
    const dispatch = useDispatch()

    const { chatSystem: { user, chats } } = useSelector(state => state.socket)
    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get("http://localhost:5000/api/chat", config);
           
            dispatch(handleChats(data));

        } catch (error) {

            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        dispatch(
            handleUser(
                (JSON.parse(localStorage.getItem("userInfo")))
            )
        )

        fetchChats();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {
                chats ? (
                    <>
                        {
                            chats?.map((chat) => (

                                <div key={chat._id}
                                    onClick={() => dispatch(handleSelectedChat(chat))}>
                                    <Chatlist chat={chat} />
                                </div>
                            ))
                        }
                    </>
                ) : (
                    <ChatLoading />
                )}
        </>
    );
};

export default Chats;