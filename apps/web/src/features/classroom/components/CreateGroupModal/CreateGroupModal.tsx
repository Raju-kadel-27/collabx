import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Avatar, Button, Divider} from '@chakra-ui/react';
import { Chip } from '../chips/Chip';

export const CreateGroupModal = ({ setIsOpen, isOpen }:any) => {

    let peoples = [
        {
            _id: '2312562323',
            name: 'Rajeev kadel',
            email: 'rajeevkadel@gmail.com',
        },
        {
            _id: '23125163',
            name: 'Maiya kadel',
            email: 'maiyakadel@gmail.com',
        },
        {
            _id: '23125163',
            name: 'Maiya kadel',
            email: 'maiyakadel@gmail.com',
        },
    ]

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState(peoples);
    const handleSearch = () => { }

    return (
        <div className=' bg-red-500'>

            <Modal size={'2xl'} isOpen={isOpen} onClose={()=>{console.log('modal closed')}} >
                <ModalOverlay />
                <Button
                    className='absolute top-5 right-10'
                    width={'16'}
                    onClick={() => setIsOpen(!isOpen)}
                    colorScheme='red'>
                    Close
                </Button>

                <ModalContent>
                    <ModalCloseButton onClick={() => setIsOpen(!isOpen)} />

                    <div className=' w-full justify-between pb-6'>

                        <div className="flex w-3/4 mb-auto pt-6 px-6 mx-auto items-center justify-between relative">

                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="relative  m-0 block w-[1px] min-w-0 flex-auto rounded-full border border-solid border-neutral-300 bg-transparent bg-clip-padding px-4 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                placeholder="Find people for your team.. "
                                aria-label="Search"
                                aria-describedby="button-addon2" />

                            <div
                                className='absolute max-h-[35vh] overflow-hidden hover:overflow-y-auto z-50 w-[27vw] mt-[12px] shadow-md rounded-b-md bg-slate-50 top-14'>
                                {search && searchResult?.map((searchUser) => (
                                    <div
                                        key={searchUser._id}
                                    >
                                        <div className=' flex justify-between space-x-6 items-center px-2'>
                                            <div className=' flex justify-start space-x-6 items-center p-2'>
                                                <div>
                                                    <Avatar size={'sm'} src='https://bit.ly/dan-abramov' />
                                                </div>
                                                <div>
                                                    <p className='text-gray-800 text-[15px]'>{searchUser?.name}</p>
                                                    <p className='text-xs mt-1 text-gray-500'>{searchUser?.email}</p>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <p
                                                    // onClick={() => accessChat(searchUser?._id)}
                                                    className='bg-slate-200 hover:cursor-pointer hover:text-white hover:bg-blue-600 p-1 px-3 text-[14px] rounded-md text-black'>Add</p>
                                            </div>
                                        </div>

                                        <Divider />
                                    </div>

                                ))
                                }

                            </div>

                            <span
                                onClick={handleSearch}
                                className="input-group-text hover:cursor-pointer hover:text-black flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                                id="basic-addon2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                        clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>

                        <div className=''>
                            <Chip />
                        </div>
                        <Button ml='5' mx={'6'}  colorScheme='green'>Make Group</Button>

                    </div>
                    

                </ModalContent>
            </Modal>
        </div>
    )
}
