import { Avatar, Grid, GridItem } from '@chakra-ui/react'
import { Button, Divider, Heading } from '@chakra-ui/react'
import { BsFillHouseFill, BsPlus, BsPlusCircle } from 'react-icons/bs';
import { TbGradienter } from 'react-icons/tb';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { AiOutlineSetting, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { RoomTabs } from '../components/Tabs/Tabs';
import { Tooltip } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
import { RecordingList } from '../components/RecordingList/RecordingList';
// import { DatePicker } from '../components/DatePicker/DatePicker'

const Room = () => {

    const navigateTo = useNavigate();
    const { roomId } = useParams();

    return (
        <Grid
            h='100vh'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(8, 1fr)'
            gap={4}
        >
            <GridItem rowSpan={2} colSpan={2} bg=''>
                <div className='w-full'>
                    <div className='py-4 mt-2 px-3 w-full'>
                        <div className='flex justify-between items-center'>
                            <Heading size={'lg'} color={'gray.600'} my={6}>Participants</Heading>
                        </div>

                        <div className='max-h-[82vh] overflow-hidden hover:pr-4 hover:overflow-y-auto'>
                            <div>
                                <div className='w-full h-8 items-center flex justify-between space-x-2  '>
                                    <div className='flex items-center space-x-2'>
                                        <Avatar name='D' bg={'blue.400'} size={'sm'} />
                                        <div>
                                            <p className='text-md'>Darpan Kattel</p>
                                            <p className=' text-gray-400 text-sm'>darpan@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className='flex space-x-4'>
                                        <AiOutlineEdit className='hover:cursor-pointer' size={20} color='gray' />
                                        <AiOutlineDelete className='hover:cursor-pointer' size={20} color='gray' />
                                    </div>
                                </div>
                                <Divider my={4} />
                            </div>

                            <div>
                                <div className='w-full h-8 items-center flex justify-between space-x-4  '>
                                    <div className='flex items-center space-x-2'>
                                        <Avatar name='D' bg={'blue.400'} size={'sm'} />
                                        <div>
                                            <p className=' text-md'>Binay Prakash Koirala</p>
                                            <p className=' text-gray-400 text-sm'>binay@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className='flex space-x-4'>
                                        <AiOutlineEdit className='hover:cursor-pointer' size={20} color='gray' />
                                        <AiOutlineDelete className='hover:cursor-pointer' size={20} color='gray' />
                                    </div>
                                </div>
                                <Divider my={4} />
                            </div>

                            <div>
                                <div className='w-full h-8 items-center flex justify-between space-x-4  '>
                                    <div className='flex items-center space-x-4'>
                                        <Avatar name='D' bg={'red.400'} size={'sm'} />
                                        <div>
                                            <p className='text-md'>Shristy Nepal</p>
                                            <p className=' text-gray-400 text-sm'>Shristy@gmail.com</p>
                                        </div>

                                    </div>
                                    <div className='flex space-x-3'>

                                        <AiOutlineEdit className='hover:cursor-pointer' size={20} color='gray' />
                                        <AiOutlineDelete className='hover:cursor-pointer' size={20} color='gray' />
                                    </div>
                                </div>
                                <Divider my={4} />
                            </div>
                            <div>
                                <div className='w-full h-8 items-center flex justify-between space-x-4  '>
                                    <div className='flex items-center space-x-4'>
                                        <Avatar name='D' bg={'red.400'} size={'sm'} />
                                        <div>
                                            <p className='text-md'>Shristy Nepal</p>
                                            <p className=' text-gray-400 text-sm'>Shristy@gmail.com</p>
                                        </div>

                                    </div>
                                    <div className='flex space-x-3'>

                                        <AiOutlineEdit className='hover:cursor-pointer' size={20} color='gray' />
                                        <AiOutlineDelete className='hover:cursor-pointer' size={20} color='gray' />
                                    </div>
                                </div>
                                <Divider my={4} />
                            </div>
                            <div>
                                <div className='w-full h-8 items-center flex justify-between space-x-4  '>
                                    <div className='flex items-center space-x-4'>
                                        <Avatar name='D' bg={'red.400'} size={'sm'} />
                                        <div>
                                            <p className='text-md'>Shristy Nepal</p>
                                            <p className=' text-gray-400 text-sm'>Shristy@gmail.com</p>
                                        </div>

                                    </div>
                                    <div className='flex space-x-3'>

                                        <AiOutlineEdit className='hover:cursor-pointer' size={20} color='gray' />
                                        <AiOutlineDelete className='hover:cursor-pointer' size={20} color='gray' />
                                    </div>
                                </div>
                                <Divider my={4} />
                            </div>


                            <div>
                                <div className='w-full h-8 items-center flex justify-between space-x-4  '>
                                    <div className='flex items-center space-x-4'>
                                        <Avatar name='D' bg={'red.400'} size={'sm'} />
                                        <div>
                                            <p className='text-md'>Shristy Nepal</p>
                                            <p className=' text-gray-400 text-sm'>Shristy@gmail.com</p>
                                        </div>

                                    </div>
                                    <div className='flex space-x-3'>

                                        <AiOutlineEdit className='hover:cursor-pointer' size={20} color='gray' />
                                        <AiOutlineDelete className='hover:cursor-pointer' size={20} color='gray' />
                                    </div>
                                </div>
                                <Divider my={4} />
                            </div>
                            <div>
                                <div className='w-full h-8 items-center flex justify-between space-x-4  '>
                                    <div className='flex items-center space-x-4'>
                                        <Avatar name='D' bg={'red.400'} size={'sm'} />
                                        <div>
                                            <p className='text-md'>Shristy Nepal</p>
                                            <p className=' text-gray-400 text-sm'>Shristy@gmail.com</p>
                                        </div>

                                    </div>
                                    <div className='flex space-x-3'>

                                        <AiOutlineEdit className='hover:cursor-pointer' size={20} color='gray' />
                                        <AiOutlineDelete className='hover:cursor-pointer' size={20} color='gray' />
                                    </div>
                                </div>
                                <Divider my={4} />
                            </div>
                            <div>
                                <div className='w-full h-8 items-center flex justify-between space-x-4  '>
                                    <div className='flex items-center space-x-4'>
                                        <Avatar name='D' bg={'red.400'} size={'sm'} />
                                        <div>
                                            <p className='text-md'>Shristy Nepal</p>
                                            <p className=' text-gray-400 text-sm'>Shristy@gmail.com</p>
                                        </div>

                                    </div>
                                    <div className='flex space-x-3'>

                                        <AiOutlineEdit className='hover:cursor-pointer' size={20} color='gray' />
                                        <AiOutlineDelete className='hover:cursor-pointer' size={20} color='gray' />
                                    </div>
                                </div>
                                <Divider my={4} />
                            </div>
                        </div>
                    </div>
                </div>
            </GridItem>

            <GridItem rowSpan={2} pt={8} pb={4} colSpan={5} bg=''>
                <RoomTabs />
            </GridItem>

            <GridItem colSpan={1} rowSpan={2} bg='gray.50'>
                <div className='mt-3 flex justify-end space-x-4 px-4 pr-12'>
                    <Button
                        onClick={() => navigateTo(`/create-classroom/room/join/${roomId}`)}
                        leftIcon={<BiSolidPhoneCall size={20} color={'white'} />}
                        _hover={{ bg: 'red.600' }}
                        color={'white'}
                        bg={'red.500'}>Join Room</Button>
                </div>
            </GridItem>
        </Grid>
    )
}

export default Room