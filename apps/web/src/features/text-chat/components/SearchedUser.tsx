import { Divider } from '@chakra-ui/react'

const SearchedUser = ({ searchUser }) => {
    return (
        <div
            className='absolute h-[32vh] shadow-md overflow-hidden z-50 w-[27vw] mt-[-3px] rounded-b-md bg-slate-50 top-14'>
            <div className=' flex justify-between space-x-6 items-center px-2'>
                <div className=' flex justify-start space-x-6 items-center p-2'>

                    <div>
                        <Avatar size={'md'} src='https://bit.ly/dan-abramov' />
                    </div>
                    <div>
                        <p className='text-gray-500 text-[17px]'>{searchUser?.name}</p>
                        <p className='text-xs mt-1 text-gray-400'>{searchUser?.email}</p>
                    </div>
                </div>

                <div className=''>
                    <p
                        onClick={() => accessChat(searchUser?._id)}
                        className='bg-slate-200 hover:cursor-pointer hover:bg-red-100 p-2 text-[14px] rounded-lg text-black'>Start Chat</p>
                </div>

            </div>
            <Divider />
        </div>
    )
}

export default SearchedUser