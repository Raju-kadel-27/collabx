import { Avatar } from '@chakra-ui/react'

export const AvatarView = ({ size, client }) => (
    <div className='flex flex-col justify-center items-center space-y-3'>
        <Avatar name='Ryan Florence' size={size || '2xl'} src='https://bit.ly/ryan-florence' />
        <p className='text-md font-semibold text-slate-400 my-3'>{client?.name}</p>
    </div>
)
