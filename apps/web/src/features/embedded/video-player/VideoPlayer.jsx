import { Button, Divider, Heading } from '@chakra-ui/react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { BsDownload } from 'react-icons/bs';
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router'

export const VideoPlayer = () => {
    const navigateTo = useNavigate();
    const { roomId } = useParams();

    let list = (
        <div onClick={() => navigateTo(`/create-classroom/room/${roomId}/player`)} className='pr-3 flex py-3 hover:bg-slate-50 hover:cursor-pointer  justify-between w-full'>
            <div className='flex justify-start space-x-3 mr-10'>
                <BsFillPlayCircleFill size={24} color='green' />
                <p>Introduction to programming.mp4</p>
            </div>
            <div className='flex font-light flex-grow justify-between space-x-6 items-center'>
                <p> Recorded on : 2022-09-12 </p>
                <p>Duration: 56 mins</p>
            </div>
        </div>
    )

    return (
        <div className='flex justify-center pt-4 bg-slate-100 h-screen items-start px-6' >

            <div>
                <ReactPlayer
                    controls={true}
                    url={'https://youtu.be/k6BnSIs3XUQ?list=RDKDjmKFjxXt0'}
                // url={'https://player.vimeo.com/progressive_redirect/playback/840626220/rendition/540p/file.mp4?loc=external&signature=dff1e43b8723b0068d8f307d190fdbc2f4c1ba69b40d5d32b1d3bd4bd273907c'}
                />

                <div className='flex justify-between items-center'>
                    <div className='mt-5 font-thin'>
                        <p className='font-semibold'>Introduction to programming.mp4</p>
                        <p>Recorded by : Mahesh karki</p>
                        <p>Video Length : 126 mins</p>
                        <p className='mt-3 w-fit flex justify-start space-x-2'>
                            <Button>Like</Button>
                            <Button>Share</Button>
                            <Button>Comment</Button>
                        </p>
                        <p></p>
                    </div>
                    <div className='flex-col items-center justify-center '>
                        <p className='font-semibold my-2 mr-4 text-slate-500 text-center'>Download Now</p>
                        <BsDownload size={32} color='green'/>
                    </div>
                </div>
            </div>

            <div className='pb-6 px-8 h-full'>

                <div className='pl-20 '>
                    <div className=''>
                        <Heading color={'gray.600'} size={'md'} pb={6} pt={4}>Explore previous recordings</Heading>
                    </div>
                    <Divider />

                    <div className='ml-auto mt-4'>
                        <div className='flex mb-3 items-center justify-start space-x-6'>
                            <div className='h-40 w-60 bg-slate-300'></div>
                            <div className='mr-12 font-light flex-grow'>
                                <p className='font-medium text-slate-500' >Breadth First Traversal</p>
                                <p>2022-03-12, 56 mins</p>
                                <p>Size : 156 mb</p>
                            </div>
                            <BsDownload className='hover:scale-105 cursor-pointer' size={24} color='gray' />
                        </div>
                        <Divider />
                    </div>

                    <div className='ml-auto mt-4'>
                        <div className='flex mb-3 items-center justify-start space-x-6'>
                            <div className='h-40 w-60 bg-slate-300'></div>
                            <div className='mr-12 font-light flex-grow'>
                                <p className='font-medium text-slate-500' >Breadth First Traversal</p>
                                <p>2022-03-12, 56 mins</p>
                                <p>Size : 156 mb</p>
                            </div>
                            <BsDownload className='hover:scale-105 cursor-pointer' size={24} color='gray' />
                        </div>
                        <Divider  />
                    </div>

                    <div className='ml-auto mt-4'>
                        <div className='flex mb-3 items-center justify-start space-x-6'>
                            <div className='h-40 w-60 bg-slate-300'></div>
                            <div className='mr-12 font-light flex-grow'>
                                <p className='font-medium text-slate-500' >Breadth First Traversal</p>
                                <p>2022-03-12, 56 mins</p>
                                <p>Size : 156 mb</p>
                            </div>
                            <BsDownload className='hover:scale-105 cursor-pointer' size={24} color='gray' />
                        </div>
                        <Divider />
                    </div>

                </div>
            </div>


        </div>
    );
};

