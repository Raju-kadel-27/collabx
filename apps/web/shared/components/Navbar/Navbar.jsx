import React, { useState } from 'react'
import { MdOutlineDarkMode } from 'react-icons/md'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Avatar, Divider } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import axios from "axios";
import { useToast } from "@chakra-ui/toast";

// import { handleSelectedChat, handleChats } from '../features/video/VideoSlice';
// import DrawerExample from './Drawer/Drawer';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    // const { chatSystem: { user, chats } } = useSelector(state => state.socket)
    const toast = useToast();

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        // try {
        //     setLoading(true);

        //     const config = {
        //         headers: {
        //             Authorization: `Bearer ${user.token}`,
        //         },
        //     };

        //     const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
        //     console.log({ data })
        //     setLoading(false);
        //     setSearchResult(data);
        // } catch (error) {
        //     toast({
        //         title: "Error Occured!",
        //         description: "Failed to Load the Search Results",
        //         status: "error",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "bottom-left",
        //     });
        // }
    };


    const accessChat = async (userId) => {
        // console.log({ userId })
        // try {
        //     setLoadingChat(true);
        //     const config = {
        //         headers: {
        //             "Content-type": "application/json",
        //             Authorization: `Bearer ${user.token}`,
        //         },
        //     };
        //     const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);

        //     if (!chats?.find((c) => c._id === data._id)) dispatch(handleChats([data, ...chats]));
        //     dispatch(handleSelectedChat(data))
        //     setLoadingChat(false);
        // }
        // catch (error) {
        //     console.log({ error })
        //     toast({
        //         title: "Error fetching the chat",
        //         description: error.message,
        //         status: "error",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "bottom-left",
        //     });
        // }
    };

    return (
        <nav
            className=" sticky top-0 right-0 flex w-full flex-wrap items-center justify-between  py-2 text-neutral-500 shadow-xs hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
            {/* className=" sticky top-0 right-0 flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-md hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"> */}
            <div className='mr-auto ml-7'>
                {/* <DrawerExample /> */}
            </div>

            <div className="flex w-[30%] ml-auto items-center justify-between relative">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="relative  m-0 block w-[1px] min-w-0 flex-auto rounded-full border border-solid border-neutral-300 bg-transparent bg-clip-padding px-4 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search People "
                    aria-label="Search"
                    aria-describedby="button-addon2" />
                {
                    search && searchResult?.map((searchUser) => (

                        <div
                            className='absolute h-[32vh] shadow-md overflow-hidden z-50 w-[27vw] mt-[-3px] rounded-b-md bg-slate-50 top-14'>
                            <div className=' flex justify-between space-x-6 items-center px-2'>
                                <div className=' flex justify-start space-x-6 items-center p-2'>

                                    <div>
                                        <Avatar size={'md'} src='https://bit.ly/dan-abramov' />
                                    </div>
                                    <div>
                                        <p className='text-gray-500 text-[17px]'>{searchUser?.name}</p>
                                        <p className='text-xs mt-1 text-gray-400'>{searchUser?.email}</p>
                                    </div>
                                </div>

                                <div className=''>
                                    <p
                                        onClick={() => accessChat(searchUser?._id)}
                                        className='bg-slate-200 hover:cursor-pointer hover:bg-red-100 p-2 text-[14px] rounded-lg text-black'>Start Chat</p>
                                </div>

                            </div>
                            <Divider />
                        </div>



                    ))
                }


                <span
                    onClick={handleSearch}
                    className="input-group-text hover:cursor-pointer hover:text-black flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd" />
                    </svg>
                </span>
            </div>


            <div onClick={handleSearch} className="relative flex items-center ml-auto mr-8">
                <a
                    className="mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="#">
                    <span className="[&>svg]:w-5">
                        <MdOutlineDarkMode size={32} color='black' />
                    </span>
                </a>

                <div className="relative" data-te-dropdown-ref>
                    <a
                        className="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                        href="#"
                        id="dropdownMenuButton1"
                        role="button"
                        data-te-dropdown-toggle-ref
                        aria-expanded="false">
                        <span className="[&>svg]:w-5">
                            <IoMdNotificationsOutline size={32} color='gray' />
                        </span>
                        <span
                            className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                        >1</span
                        >
                    </a>
                    <ul
                        className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                        aria-labelledby="dropdownMenuButton1"
                        data-te-dropdown-menu-ref>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                href="#"
                                data-te-dropdown-item-ref
                            >Action</a
                            >
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                href="#"
                                data-te-dropdown-item-ref
                            >Another action</a
                            >
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                href="#"
                                data-te-dropdown-item-ref
                            >Something else here</a
                            >
                        </li>
                    </ul>
                </div>

                <div className="relative" data-te-dropdown-ref>
                    <a
                        className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                        href="#"
                        id="dropdownMenuButton2"
                        role="button"
                        data-te-dropdown-toggle-ref
                        aria-expanded="false">
                        <img
                            src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                            className="rounded-full w-8 h-8"
                            // style="height: 25px; width: 25px"
                            alt=""
                            loading="lazy" />
                    </a>
                    <ul
                        className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                        aria-labelledby="dropdownMenuButton2"
                        data-te-dropdown-menu-ref>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                href="#"
                                data-te-dropdown-item-ref
                            >Action</a
                            >
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                href="#"
                                data-te-dropdown-item-ref
                            >Another action</a
                            >
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                href="#"
                                data-te-dropdown-item-ref
                            >Something else here</a
                            >
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Navbar