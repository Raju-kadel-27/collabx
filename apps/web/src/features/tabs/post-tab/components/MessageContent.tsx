import { Avatar } from '@chakra-ui/react'
import { IoChevronDownSharp } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";

export const MessageContent = () => {
    return (
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
                            Rachel Simson
                            <span className='text-[13px] mx-2 font-normal text-slate-500'>
                                11:55 AM
                            </span>
                        </p>
                    </div>

                    {/* Message content ui */}
                    <div>
                        <p className='text-slate-500 font-lato max-w-lg'>
                            Today we are going to conduct interns welcome program at Room no.23
                            Please try to be present at time.Huge round of applause for all the interns
                            early from our side.
                        </p>
                    </div>

                    {/* Team meeting ui */}
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
    )
};
