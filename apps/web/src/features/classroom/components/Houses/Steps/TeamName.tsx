import { AiOutlineUser, AiFillPlusSquare } from 'react-icons/ai';
import {
    Avatar,
    Input,
    Button,
    Heading
} from '@chakra-ui/react';
import { useState } from 'react';

let AvatarImageContent = ({ color }) => {
    return (
        <div className='p-1 pb-2 border-[1px] border-gray-300'>
            <div className='flex flex-col items-center space-y-3'>
                <Avatar
                    bg={color}
                    size={'sm'}
                    icon={<AiOutlineUser fontSize='1.5rem' />}
                />
                <p className='h-2 rounded-full w-12 bg-gray-300'></p>
            </div>
        </div>
    )
}

export const TeamName = ({ onNext }) => {
    const [teamName, setTeamName] = useState('')

    function handleChange(e) {
        setTeamName(e.target.value)
    }

    return (
        <div className='w-3xl flex flex-col justify-center space-y-4 items-center h-[75vh] bg-gray-200'>
            <AiFillPlusSquare
                color='green'
                size={36}
                className='mr-64 z-50 mb-[-44px]'
            />
            <div className='grid grid-cols-4 max-w-md'>
                <AvatarImageContent color={'red.500'} />
                <AvatarImageContent color={'purple.500'} />
                <AvatarImageContent color={'yellow.500'} />
                <AvatarImageContent color={'blue.500'} />
                <AvatarImageContent color={'blue.500'} />
                <AvatarImageContent color={'red.500'} />
                <AvatarImageContent color={'purple.500'} />
                <AvatarImageContent color={'yellow.500'} />
            </div>
            <Heading color={'gray.900'} fontWeight={''} size={'md'}>Create a New Team</Heading>
            <div className='w-full px-16'>
                <Input
                    _hover={{ outlineColor: 'gray.400' }}
                    outlineColor={'blue.300'}
                    my={4}
                    placeholder='Name your team'
                    size='md'
                    value={teamName}
                    onChange={handleChange}
                />
            </div>
            <div className='flex flex-col px-5 text-xs items-center justify-center'>
                <p className='text-slate-500 text-lg font-semibold my-1 mr-auto '>What is Team ?</p>
                <p className='text-slate-500 text-left mt-1 mr-auto '>Team is simply a group of participants. Each team may have multiple rooms attached to it.</p>
                <p className='text-slate-500 max-w-xl '>For example : Harvard High School (Team Name) may have multiple classes like Physics,chemistry,Maths,English (i.e. Multiple rooms)</p>
                <Button
                    onClick={() => onNext()}
                    ml={20}
                    px={5}
                    mx={'auto'}
                    mt={6}
                    rounded={'full'}
                    colorScheme='green'
                > Next</Button>
            </div>
        </div>
    )
}
