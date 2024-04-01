import {
    Avatar,
    Divider
} from '@chakra-ui/react'
// import { useDispatch } from 'react-redux'
import { SideGroupChat } from "../SideGroupChat/SideGroupChat"

export default function RightDrawer() {
    // const dispatch = useDispatch()
    // const btnRef = React.useRef()

    return (
        <div className='w-[300px] overflow-hidden absolute top-0 right-0 h-screen  bg-slate-800'>
            {/* <h1 onClick={() => dispatch(handleChat())}>Close</h1> */}

            {/* <SideGroupChat/> */}
            <div className='h-14 shadow-sm flex bg-slate-800 justify-start space-x-2 pt-3 px-4 '>
                <Avatar size={'sm'} name='G' bg={'blue.400'} />
                <p className='text-slate-200 font-medium'>Purwanchal Room</p>
            </div>
            <Divider color={'gray.900'} />

            <SideGroupChat />

        </div>
    )
}