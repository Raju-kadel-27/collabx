import { Box, Stack, Text, Heading, Divider } from "@chakra-ui/layout";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getSender } from "../utils/ChatLogics";
import { userSelector } from "../../authentication/redux/slices/userSlice";
import { PulseLoader } from "react-spinners"
import { handleSelectedChat, textChatSelector } from "../redux/slices/ChatSlice";
// import { SelectUsers } from "./SelectUsers";
import { useState } from 'react';
import {
    useAccessChatMutation,
    useFetchAllChatsQuery,
    // useFetchAllUsersQuery
} from "../redux/apis/chatApiSlice";
import {useGetChannelMembersQuery} from "@/features/channels/redux/apis/ChannelApiSlice";

export const MyChats = () => {
    const [searchText, setSearchText] = useState<string>('');
    const dispatch = useDispatch();
    const { selectedChat } = useSelector(textChatSelector, (prev, next) => prev === next);
    const user = useSelector(userSelector, (prev, next) => prev === next);

    const { data: allChats} = useFetchAllChatsQuery({ userId: user?._id || '' });
    const {}=useGetChannelMembersQuery({teamId,channelId},{skip:!channelId || !teamId});
    const [accessChat] = useAccessChatMutation();
    
    const handleAccessChat = async (id: string) => {
        try {
            let payload = {
                peerId: id,
                ownId: user._id
            }
            const _accessChat = await accessChat(payload);
          console.log({_accessChat});
        } catch (error) {
            console.log({ error })
        }
    }

    // const fetchChats = async () => {
    //     try {
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`,
    //             },
    //         };

    //         const { data } = await axios.get("http://localhost:5000/api/chat", config);
    //         dispatch(handleChats(data));

    //     } catch (error) {
    //         toast({
    //             title: "Error Occured!",
    //             description: "Failed to Load the chats",
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom-left",
    //         });
    //     }
    // };

    // useEffect(() => {
    //     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    //     fetchChats();
    //     // eslint-disable-next-line
    // }, [fetchAgain]);

    // if (searchText) {
    //     return (
    //         <>

    //         </>
    //     )
    // }

    const handleNamedInput = () => {
        console.log('//Named Input//');
        console.log('Handling new auth')
    }

    const datas = [
        { _id: '1', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
        { _id: '2', name: 'Bob Smith', email: 'bob.smith@example.com' },
        { _id: '3', name: 'Charlie Davis', email: 'charlie.davis@example.com' },
        { _id: '4', name: 'David Miller', email: 'david.miller@example.com' },
        { _id: '5', name: 'Eva Brown', email: 'eva.brown@example.com' },
        { _id: '6', name: 'Frank White', email: 'frank.white@example.com' },
        { _id: '7', name: 'Grace Lee', email: 'grace.lee@example.com' },
    ];

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            className="w-full"
            style={{ width: '100%' }}
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                <Heading size={'lg'} color={'gray.900'}>Chats</Heading>
                {/* <GroupChatModal> */}
                {/* <Button
                    bg-
                        d="flex"
                        marginLeft={'6'}
                        bg={'pink.300'}
                        // fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                    >
                        New Group Chat
                    </Button> */}
                {/* </GroupChatModal> */}
            </Box>

            <div
                className="flex bg-slate-100 w-full px-4 mx-auto mt-4 pb-6 items-center justify-between relative">
                <input
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-full border border-solid border-neutral-300 bg-transparent bg-clip-padding px-4 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Add your friends to chat.."
                    aria-label="Search"
                    aria-describedby="button-addon2" />
                <div
                    className=' bg-white left-[-2vh] absolute pt-2 overflow-hidden hover:overflow-y-auto z-50 w-[27vw] mt-[71vh] rounded-b-md'>
                    {/* <SelectUsers /> */}

                    {searchText &&
                        datas?.map((searchUser: any) => (
                            <div
                                key={searchUser._id}
                            >
                                <div className=' flex justify-between space-x-6 items-center px-2'>
                                    <div className=' hover:cursor-pointer flex justify-start space-x-6 items-center p-2'>
                                        <div>
                                            <Avatar size={'sm'} src='https://bit.ly/dan-abramov' />
                                        </div>
                                        <div>
                                            <p className='text-gray-800 text-[15px]'>{searchUser?.name}</p>
                                            <p className='text-xs mt-1 text-gray-500'>{searchUser?.email}</p>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <p
                                            onClick={() => handleAccessChat(searchUser?._id)}
                                            className='bg-slate-200 hover:cursor-pointer hover:text-white hover:bg-blue-600 p-1 px-3 text-[14px] rounded-md text-black'>Add</p>
                                    </div>
                                </div>
                                <Divider />
                            </div>
                        ))
                    }
                </div>
            </div>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {allChats ? (
                    <Stack overflowY="auto" >
                        {allChats?.allChats
                            .map((chat, i) => (
                                <Box
                                    key={i}
                                    pt={'2'}
                                    bg={selectedChat === chat ? "gray.50" : ""}

                                >
                                    <Box

                                        onClick={() => dispatch(handleSelectedChat(chat))}
                                        cursor="pointer"
                                        display={'flex'}
                                        px={3}
                                        // py={3}
                                        key={i}
                                    // key={chat._id}
                                    >
                                        <Avatar name="M" bg={'blue.400'} >
                                            <AvatarBadge boxSize='0.85em' bg='green.500' />
                                        </Avatar>

                                        <div className="px-4">
                                            <Text>
                                                {!chat.isGroupChat
                                                    ? getSender(user, chat.users)
                                                    : chat.chatName}
                                            </Text>
                                            {chat?.latestMessage && (
                                                <Text paddingTop={'2'} fontSize="xs">
                                                    <b>{chat?.latestMessage?.sender.name} : </b>
                                                    {chat?.latestMessage?.content?.length > 50
                                                        ? chat?.latestMessage?.content.substring(0, 51) + "..."
                                                        : chat?.latestMessage?.content}
                                                </Text>
                                            )}

                                        </div>

                                    </Box>
                                    <Divider paddingTop={'3'} />

                                </Box>

                            ))}
                    </Stack>
                ) : (
                    <PulseLoader />
                )}
            </Box>
        </Box>
    );
};

