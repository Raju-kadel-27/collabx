import './index.css';
import { Avatar, Divider, Tag, TagLabel } from "@chakra-ui/react";
import { MdOutlineChevronRight } from "react-icons/md";
import { HiMiniChevronDown } from "react-icons/hi2";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { MessageContent } from './MessageContent';
import { MessageInput } from "./MessageInput";
import { ModalProvider } from '@/components/ui/modal';
import { ManageChannel } from './ManageChannel';
import React, { useEffect, useRef, useState } from 'react';
import { useGetAllPostsQuery } from '../redux/apis/PostApiSlice';
import { PulseLoader } from 'react-spinners';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const AboutSection = () => {
    return (
        <>
            <Divider className="mt-2" size={'sm'} />

            <div className='flex items-center justify-between px-4 mt-8 mb-4'>
                <p>About</p>
                <HiMiniChevronDown size={18} color={'black'} />
            </div>

            <div className=' bg-slate-200 py-6 px-2'>
                <h1 className='font-semibold '>Topic</h1>
                <p className="font-lato"> coordinate social media.</p>
            </div>
            <div className=' bg-slate-200 px-2 pb-4'>
                <h1 className='font-semibold '>Description</h1>
                <p className="font-lato">Home of the social media team</p>
            </div>
        </>
    )
}

const IconRenderer = () => {
    return (
        <div className="flex justify-around items-center pt-4">
            <div>
                <div className='bg-slate-100 hover:cursor-pointer rounded-full w-9 h-9 grid place-items-center'>
                    <IoPersonAddOutline size={22} color={'black'} />
                </div>
                <p className='text-sm mt-1 text-center font-lato'>Add</p>
            </div>

            <div>
                {/* <Link to={'/room/mesh/join/12345'}> */}
                <Link to={'/room/sfu/join/12345'}>
                    <div className='bg-green-300 hover:cursor-pointer rounded-full w-9 h-9 grid place-items-center'>
                        <IoCallOutline size={22} color={'black'} />

                    </div>
                    <p className='text-sm mt-1 text-center font-lato'>Call</p>
                </Link>
            </div>

            <div>
                <div className='bg-slate-100 hover:cursor-pointer rounded-full w-9 h-9 grid place-items-center'>
                    <MdOutlinePersonSearch size={22} color={'black'} />
                </div>
                <p className='text-sm mt-1 text-center font-lato'>Find</p>
            </div>

        </div>
    )
}

const StatInfo = (
    { title, count }:
        { title: string; count: number }
) => {
    return (
        <>
            <Divider className="mt-[-7px]" />
            <p className="p-4 w-full font-roboto hover:bg-slate-50 hover:cursor-pointer">
                {title}
                <span className=" rounded-full ml-2 text-sm h-5 w-5  bg-slate-200"> {count} </span>

                <MdOutlineChevronRight
                    className='ml-auto mt-[-18px]'
                    size={14}
                />
            </p>
        </>
    )
};

export default function ConversationLayout() {

    const { teamId, channelId } = useParams()
    console.log({ teamId, channelId })

    const containerRef = useRef(null);
    const [open, setOpen] = useState<boolean>(false);
    const handleClickTag = (e: React.MouseEvent<HTMLParagraphElement>) => {
        console.log({ e })
        setOpen((prev: boolean) => !prev)
    };
    const { data,
        isLoading,
        isError,
        error,
    } = useGetAllPostsQuery(channelId, {
        skip: !channelId || !teamId
    });
    const [serverMessages, setServerMessage] = useState<any>(null);

    useEffect(() => {
        setServerMessage(data);
    }, [data])
    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [serverMessages]);

    console.log({ serverMessages });

    if (isLoading) {
        return (
            <div className='flex w-full h-full justify-center p-12 items-center'>
                <PulseLoader
                    size={24}
                    color={'blue'}
                />
            </div>
        )
    }
    if (
        isError &&
        error
    ) {
        return (
            <div className='w-full h-full font-lato text-red-500 text-xs'>
                <p>Something went up</p>
                <p>{error?.message}</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-12 h-full">
                <div className="col-span-9">
                    <div
                        ref={containerRef}
                        className="h-[75vh] scroll-smooth overflow-y-auto">
                        {
                            serverMessages?.map((message: string, i) => (
                                <React.Fragment key={i}>
                                    <MessageContent
                                        message={message}
                                    />
                                </React.Fragment>
                            ))
                        }
                    </div>
                    <div>
                        <MessageInput />
                    </div>
                </div>
                <div className="col-span-3 h-[75vh] w-full border-l border-1 border-gray-100">
                    <Tag
                        size='lg'
                        className='hover:cursor-pointer'
                        colorScheme='gray'
                        borderRadius='full'
                        onClick={handleClickTag}
                    >
                        <Avatar
                            src='https://bit.ly/sage-adebayo'
                            size='xs'
                            name='Segun Adebayo'
                            ml={-1}
                            mr={2}
                        />

                        <TagLabel className='w-full ml-5' marginLeft={'auto'} display={'flex'} alignItems={'center'}>
                            Raju
                            <FaCircle size={8} className='mx-2' color='green' />
                        </TagLabel>
                    </Tag>

                    <div className="h-20 w-full my-2 rounded-lg">
                        <IconRenderer />
                    </div>
                    <div className="h-60 w-full mt-2 ">
                        <AboutSection />
                    </div>
                    <div className='my-5' >
                        <StatInfo title='Members' count={22} />
                        <StatInfo title='Organization' count={22} />
                        <StatInfo title='Pinned' count={22} />
                        <StatInfo title='Shortcurts' count={22} />
                    </div>
                </div>
            </div>
            <ModalProvider
                title='Manage your Channel'
                open={open}
                setOpen={setOpen}
                size='xl'
            >
                <ManageChannel />
            </ModalProvider>
        </>
    )
}
