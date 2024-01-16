import './index.css';
import { Divider, Tag, TagLabel, TagRightIcon, HStack, Avatar } from "@chakra-ui/react";
import { MdOutlineChevronRight, MdSettings } from "react-icons/md";
import { HiMiniChevronDown } from "react-icons/hi2";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { MessageContent } from './MessageContent';
import { MessageInput } from "./MessageInput";
import { ModalProvider } from '@/components/ui/modal';
import { ManageChannel } from './ManageChannel';
import { useState } from 'react';

const AboutSection = () => {
    return (
        <>
            <Divider className="mt-2" size={'sm'} />

            <div className='flex items-center justify-between px-4 mt-8 mb-4'>
                <p>About</p>
                <HiMiniChevronDown size={18} color={'black'} />
            </div>

            <div className=' bg-slate-100 py-6 px-2'>
                <h1 className='font-semibold '>Topic</h1>
                <p className="font-lato">Track and coordinate social media.</p>
            </div>
            <div className=' bg-slate-100 px-2 pb-4'>
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
                <div className='bg-green-300 hover:cursor-pointer rounded-full w-9 h-9 grid place-items-center'>
                    <IoCallOutline size={22} color={'black'} />

                </div>
                <p className='text-sm mt-1 text-center font-lato'>Call</p>
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

const StatInfo = ({ title, count }: { title: string; count: number }) => {
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
}

export const ConversationLayout = () => {

    const [open, setOpen] = useState<boolean>(false);

    const handleClickTag = (e: React.MouseEvent<HTMLParagraphElement>) => {
        console.log({ e })
        setOpen((prev: boolean) => !prev)
    }

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        try {
            console.log('Logging into the main console');
            try {
                console.log('Preparing the backend apis for thr nfts')
            } catch (error) {
                console.log('Hitting api backends system')
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <>
            <div className="grid grid-cols-12 h-full">

                {/* grid-cols-9 */}
                <div className="col-span-9">
                    <div className="h-[75vh] overflow-y-auto">
                        <MessageContent />
                        <MessageContent />
                        <MessageContent />
                        <MessageContent />
                        <MessageContent />
                        <MessageContent />
                        <MessageContent />
                    </div>
                    <div>
                        <MessageInput />
                    </div>
                </div>

                {/* grid-cols-3 */}
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
                        <TagLabel display={'flex'} alignItems={'center'}>
                            Raju
                            <FaCircle size={8} className='mx-2' color='green' />
                        </TagLabel>
                    </Tag>
                    <HStack my={4} spacing={4}>
                        {['sm', 'md', 'lg'].map((size) => (
                            <Tag size={size} key={size} variant='outline' colorScheme='blue'>
                                <TagLabel>Blue</TagLabel>
                                <TagRightIcon as={MdSettings} />
                            </Tag>
                        ))}
                    </HStack>

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
