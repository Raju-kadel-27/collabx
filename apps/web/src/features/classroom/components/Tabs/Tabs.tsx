import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Avatar, Divider } from '@chakra-ui/react'
import { TabSkeleton } from '../Skeleton/Skeleton'
import { Card, CardHeader, CardBody, CardFooter, Text, Button } from '@chakra-ui/react'
import { SiGooglemeet } from 'react-icons/si'
import { BsArrow90DegLeft } from 'react-icons/bs'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { RecordingList } from '../RecordingList/RecordingList'

export const RoomTabs = () => {
    return (
        <Tabs w={'full'} variant='enclosed'>
            <TabList w={'full'}>
                <Tab w={'full'}>Events</Tab>
                <Tab w={'full'}>Files</Tab>
                <Tab w={'full'}>Assignments</Tab>
                <Tab w={'full'}>Recordings</Tab>
            </TabList>

            <TabPanels>
                <TabPanel >
                    <div>

                        <div className='my-5 flex justify-start space-x-2 items-start'>
                            <div>
                                <Avatar name='R' bgColor={'purple.400'} size={'md'} />
                            </div>
                            <div className='h-32 border-[1px] border-slate-200 w-full py-1 px-2 rounded-md  bg-white'>
                                <div className='flex items-center space-x-4'>
                                    <p className='font-semibold text-gray-600'>Bhushan Kafle</p>
                                    <p className='text-sm'>2022-08-17 <span>12:07 PM</span></p>
                                </div>

                                <div className='flex space-x-3 mt-3 px-2'>
                                    <SiGooglemeet size={24} color={'orange'} />
                                    <p className='font-thin text-yellow-600 '>Scheduled a meeting</p>
                                </div>
                                <div className='my-2 px-2  text-slate-500  text-sm font-light'>
                                    <p>Chat : <span>17 replies among participants</span></p>
                                    <p className='flex mt-2 items-center justify-start space-x-2'>
                                        <BsArrow90DegLeft className='font-bold' size={16} color={'gray'} />
                                        <span >Reply</span>
                                    </p>
                                </div>

                                <div>
                                </div>

                            </div>
                        </div>
                        <div className='my-2 flex justify-start space-x-2 items-start'>
                            <div>
                                <Avatar name='R' bgColor={'pink.400'} size={'md'} />
                            </div>
                            <div className='h-32 border-[1px] border-slate-200 w-full py-1 px-2 rounded-md  bg-white'>
                                <div className='flex items-center space-x-4'>
                                    <p className='font-semibold text-gray-600'>Bhushan Kafle</p>
                                    <p className='text-sm'>2022-08-17 <span>12:07 PM</span></p>
                                </div>

                                <div className='flex space-x-3 mt-3 px-2'>
                                    <SiGooglemeet size={24} color={'orange'} />
                                    <p className='font-thin text-yellow-600 '>Meeting Scheduled</p>
                                </div>
                                <div className='my-2 px-2  text-slate-500 text-sm font-thin'>
                                    <p>Chat : <span>17 replies among participants</span></p>
                                    <p className='flex mt-2 items-center justify-start space-x-2'>
                                        <BsArrow90DegLeft className='font-bold' size={16} color={'gray'} />
                                        <span >Reply</span>
                                    </p>
                                </div>

                                <div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* <TabSkeleton /> */}
                </TabPanel>

                <TabPanel >
                    {/* <TabSkeleton /> */}
                    <div className='py-6'>
                        <div className='flex  hover:cursor-pointer items-center space-x-3'>
                            <AiOutlineFolderOpen className='' size={32} color='gray' />
                            <p className='text-slate-600 hover:text-slate-900'>Binary search</p>
                        </div>
                        <Divider my={4} />
                        <div className='flex items-center space-x-3'>
                            <AiOutlineFolderOpen size={32} color='gray' />
                            <p className='text-slate-600'>Recursion Notes</p>
                        </div>
                        <Divider my={4} />
                        <div className='flex items-center space-x-3'>
                            <AiOutlineFolderOpen size={32} color='gray' />
                            <p className='text-slate-600'>Theory__Book</p>
                        </div>
                        <Divider my={4} />
                        <div className='flex items-center space-x-3'>
                            <AiOutlineFolderOpen size={32} color='gray' />
                            <p className='text-slate-600'>Best Algorithms</p>
                        </div>
                        <Divider my={4} />
                    </div>
                </TabPanel>

                <TabPanel>
                    <RecordingList />
                    <RecordingList />
                    <RecordingList />
                    <RecordingList />
                    <RecordingList />
                </TabPanel>
                <TabPanel>
                    <RecordingList />
                    <RecordingList />
                </TabPanel>

            </TabPanels>

        </Tabs>
    )
}
