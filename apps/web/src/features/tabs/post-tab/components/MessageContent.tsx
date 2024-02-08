import { Avatar, Divider } from '@chakra-ui/react'
import { ReactionButton } from './ReactionButton';

export const MessageContent =
    ({ message }:
        { message: string; }
    ) => {
        return (
            <>
                <div className=''>
                    <div className='flex space-x-4 my-3'>
                        <div>
                            <Avatar
                                name='Kola Tioluwani'
                                src='https://bit.ly/tioluwani-kolawole' />
                        </div>
                        <div>
                            <div>
                                <p className='font-lato font-semibold text-black'>
                                    {message?.authorId?.name}
                                    <span className='text-[13px] mx-2 font-normal text-slate-500'>
                                        11:55 AM
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p className='text-slate-500 font-lato max-w-lg'>
                                    {message?.content}
                                </p>
                            </div>
                            <div className='flex space-x-4 mt-2'>
                                <div className='h-12 border-l-4 rounded-lg border-cyan-600'>
                                </div>
                                <div className='max-w-40'>
                                    <p className='text-cyan-500  font-lato'>
                                        Team Status Meeting
                                    </p>
                                    <p className='text-slate-500 text-sm '>
                                        Today from 1:00 PM to 1:30 PM
                                    </p>
                                </div>
                            </div>
                            <div className='py-1'>
                                <ReactionButton postId={message?._id} />
                            </div>

                            {/* Uploaded files ui */}
                            {/* <div>
                        <div className='flex space-x-1 m-2  items-center'>
                            <p>Post</p>
                            <IoChevronDownSharp
                                size={12}
                                color={'black'}
                            />
                        </div>

                        <div className='w-fit p-4 px-8 h-fit rounded-xl border border-1 border-gray-200'>

                            <div className='flex items-start space-x-4'>

                                <div>
                                    <FaRegFileAlt
                                        size={32}
                                        color={'black'}
                                    />
                                </div>

                                <div className='font-lato'>
                                    <p className='text-black font-bold'> 1/9 Meeting Notes</p>
                                    <p className='text-sm text-gray-500'>Last edited just now</p>
                                </div>

                            </div>

                        </div>
                    </div> */}

                        </div>
                    </div>
                </div>
                <Divider/>
            </>

        )
    };
