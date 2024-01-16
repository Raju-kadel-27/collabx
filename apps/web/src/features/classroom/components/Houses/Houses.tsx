import { TeamAccordion } from '../Accordion/Accordion';
import { Button, Divider, Heading } from '@chakra-ui/react';
import { BsFillHouseFill, BsPlus, BsPlusCircle } from 'react-icons/bs';
import { TbGradienter } from 'react-icons/tb';
import { AiOutlineSetting } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { CreateTeamModal } from './CreateTeamModal';

const Houses = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigateTo = useNavigate();

    return (
        <>
            {
                isOpen
                &&
                <CreateTeamModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            }

            <div className='h-[calc(100vh-64px)] w-full bg-white'>
                <section className='px-4 pt-4  w-full'>
                    <div className='flex justify-start mb-3 ml-3 mt-6 mx-6 '>
                        <Button
                            onClick={() => setIsOpen(true)}
                            bg={'green.600'}
                            color={'gray.100'}
                            _hover={{ bg: 'green.500', color: 'white' }}
                            rightIcon={<BsPlus size={20} color='white' />}
                            ml={'auto'}
                            mb={3}>Create Team</Button>
                    </div>
                    <div className='pb-6'>
                        <Heading px={8} color={'gray.700'} pt={4} pb={1} size={'md'}>Previous Teams</Heading>
                        <span className='text-slate-400 pl-8'>Team may have many rooms.</span>
                    </div>
                    <div className='grid grid-cols-4  gap-x-2 space-y-2 justify-items-stretch w-full'>
                        <div className='w-72  ml-2 h-14 flex justify-start space-x-3 pl-4 mt-2 items-center bg-yellow-300 border-[1px] '>
                            <BsFillHouseFill color='black' size={24} />
                            <p className='text-black'>Manakamana School</p>
                        </div>
                        <div className='w-72 h-14 flex justify-start space-x-3 pl-4 items-center hover:cursor-pointer hover:border-[1px] border-orange-500 '>
                            <BsFillHouseFill color='gray' size={24} />
                            <p className=''>Harvard University</p>
                        </div>
                        <div className='w-72 h-14 flex justify-start space-x-3 pl-4 items-center hover:cursor-pointer hover:border-[1px] border-orange-500 '>
                            <BsFillHouseFill color='gray' size={24} />
                            <p className=''>Mentor Time</p>
                        </div>
                    </div>
                    <div className='w-full pr-36 h-full'>
                        <Heading
                            marginTop={'10'}
                            size={'md'}
                            color={'gray.600'}
                            paddingBottom={'4'}
                            paddingX={'6'}>
                            Rooms
                        </Heading>
                        <Divider mb={4} />
                        <div className='py-2 px-5 w-full'>
                            <div>
                                <div className='w-full h-6 mt-2 items-center flex justify-between  '>
                                    <div className='flex items-center space-x-2'>
                                        <TbGradienter color='gray' size={32} />
                                        <p className='font-semibold text-md text-gray-500'>Physics class</p>
                                    </div>
                                    <p className=' text-gray-600 font-light'>Participants : 16</p>

                                    <p className=' text-gray-600 font-light'>Created : 16th April</p>
                                    <Button onClick={() => navigateTo('/create-classroom/room/12345')} border={'1px'} borderColor={'orange.400'} _hover={{ bg: 'white', color: 'orange.500' }} bg={'white'} color={'orange.400'} rounded={'none'} mr={4}>Visit room</Button>

                                </div>
                            </div>
                            <div>
                                <div className='w-full h-6 mt-8 items-center flex justify-between  '>
                                    <div className='flex items-center space-x-2'>
                                        <TbGradienter color='gray' size={32} />
                                        <p className='font-semibold text-md text-gray-500'>Physics class</p>
                                    </div>
                                    <p className=' text-gray-600 font-light'>Participants : 16</p>

                                    <p className=' text-gray-600 font-light'>Created : 16th April</p>
                                    <Button border={'1px'} borderColor={'orange.400'} _hover={{ bg: 'white', color: 'orange.500' }} bg={'white'} color={'orange.400'} rounded={'none'} mr={4}>Visit room</Button>

                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </>

    )
}

export default Houses