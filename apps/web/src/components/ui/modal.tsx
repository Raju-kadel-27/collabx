import { closeModal } from '@/features/Team/redux/slices/team';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import React, { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

interface ModalProviderProps {
    children: React.ReactNode,
    title?: string,
    size?: string,
    open: any,
    setOpen?: React.Dispatch<SetStateAction<boolean>>
}

export const ModalProvider = ({ children, size, title, open, setOpen }: ModalProviderProps) => {
    const { onClose } = useDisclosure();
    const dispatch = useDispatch();

    const handleClick = () => {
        setOpen ?
            setOpen((prev: boolean) => !prev)
            :
            dispatch(closeModal())
    }

    return (
        <Modal
            size={size || '3xl'}
            isOpen={open}
            onClose={onClose}
        >
            <ModalOverlay />

            <ModalContent className='overflow-x-hidden'>

                <ModalCloseButton onClick={handleClick} />

                <ModalHeader>
                    <p className='text-xl w-fit px-2 rounded-md font-bold'>
                        {title}
                    </p>
                </ModalHeader>

                <ModalBody overflow={'hidden'} paddingTop={3}>
                    {children}
                </ModalBody>

            </ModalContent>

        </Modal>
    )
}