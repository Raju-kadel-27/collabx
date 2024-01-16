import React from 'react';
import { Button, Checkbox } from '@chakra-ui/react';
import { GrGroup } from "react-icons/gr";
import { FaChevronLeft } from "react-icons/fa";

export const SelectGroup = ({ onBack }) => {
    return (
        <div className='grid grid-cols-2 w-3xl space-y-4 h-[75vh] bg-slate-50'>

            <div className='h-full w-full bg-white'>
                <div className='flex mt-4 items-center space-x-3 px-4'>
                    <FaChevronLeft size={18} />
                    <p className='text-gray-900 text-lg font-semibold '>Select group for your team</p>
                </div>
                <div className='p-6 flex flex-col space-y-3'>
                    <Checkbox className='' colorScheme='yellow' defaultChecked>
                        Grade XI - Newton School
                    </Checkbox>
                    <Checkbox className='' colorScheme='yellow' defaultChecked>
                        Grade XII - Purwanchal School
                    </Checkbox>
                    <Checkbox className='' colorScheme='yellow' defaultChecked>
                        Grade XI - Balmiki School
                    </Checkbox>
                    <Checkbox className='' colorScheme='yellow' defaultChecked>
                        Grade I - Purwanchal School
                    </Checkbox>
                </div>
                <div className='px-4 my-2 flex w-full justify-between '>
                    <Button
                        isLoading={false}
                        w={'full'}
                        rounded={'none'}
                        colorScheme='yellow'
                        size={'md'}>
                        Make Team</Button>
                </div>
            </div>

            <div className='h-full w-full flex flex-col justify-center items-center'>
                <div className='p-8 my-8 rounded-full bg-green-300'>
                    <GrGroup size={96} />
                </div>
                <div className='px-2'>
                    <Button
                        color={'green.500'}
                        rounded={'full'}
                        outlineColor={'green.500'}
                        bg={'white'}
                        _hover={{ color: 'green.600' }}
                        size={'md'}>
                        Create Group</Button>
                </div>
                <div className='px-2 mt-auto pb-8 ml-auto'>
                    <Button
                        onClick={() => onBack()}
                        leftIcon={<FaChevronLeft size={14} />}
                        rounded={'full'}
                        bg={'green.200'}
                        size={'md'}>
                        Back</Button>
                </div>
            </div>

        </div>
    )
}
