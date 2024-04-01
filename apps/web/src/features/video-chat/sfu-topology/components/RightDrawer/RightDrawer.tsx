import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { bottomScreenControllerSelector, handleChat } from '../../redux/slices/BottomScreenController';
import { SideGroupChat } from "../SideGroupChat/SideGroupChat";
import {
    Drawer,
    Input,
    Button,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Avatar,
    Divider
} from '@chakra-ui/react'

export default function RightDrawer() {
    const dispatch = useDispatch()
    const btnRef = React.useRef()

    return (
        <div className='w-[300px] transition-all duration-300 ease-in-out overflow-hidden absolute z-50 top-0 right-0 h-screen  bg-slate-800'>
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