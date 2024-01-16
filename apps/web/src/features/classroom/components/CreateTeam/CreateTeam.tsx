import React, { useState } from 'react';
import { Avatar, Button, Divider, Heading, Icon } from '@chakra-ui/react';
import { TeamTable } from '../Table/Table';
import { BsArrowBarRight, BsChevronCompactRight } from 'react-icons/bs';
import { Chip } from '../chips/Chip';
import { AiOutlineTeam } from 'react-icons/ai';
import { CreateGroupModal } from '../CreateGroupModal/CreateGroupModal';
import { useNavigate } from 'react-router';

const CreateTeam = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigateTo = useNavigate()

    const handleClick = () => navigateTo('/create-classroom/group-details/123456')
    let array = [1, 2, 3]

    return (
        <>
            {
                isOpen
                &&
                <CreateGroupModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            }

            <div className='h-[calc(100vh-64px)] w-full bg-white overflow-hidden'>

                <div className='flex justify-end items-center  pr-20 my-6 w-full'>
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        borderRadius={'none'}
                        rightIcon={<BsChevronCompactRight />} colorScheme='blue'>
                        Create Now
                    </Button>
                </div>

                <section>
                    <Heading px={8} color={'gray.700'} pt={4} pb={1} size={'md'}>Previous Groups</Heading>
                    <span className='text-slate-400 pl-8'>PLease select to manage your group.</span>

                    <div className='flex justify-start flex-wrap py-8 px-4 align-baseline space-x-8'>
                        {
                            array.map((item) => (
                                <div
                                    onClick={handleClick}
                                    className='h-60 w-96 border-2 border-gray-200'>
                                    <div className='flex items-center justify-start space-x-5 px-4 py-4'>
                                        <div className='h-16 w-16 rounded-full bg-yellow-300 grid place-items-center'>
                                            <AiOutlineTeam size={36} />
                                        </div>
                                        <div>
                                            <Heading size={'md'}>Purwanchal Academy</Heading>
                                            <p className='text-slate-400'>Participants : 12</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='px-6 text-left'>You can view the group members, add the nicknames and manage them. Remember the settings applied here still can be overwrited at team level.</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>



            </div>
        </>
    )
}

export default CreateTeam;