import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { TeamName, SelectGroup } from './Steps';
import { BiSolidChevronRightCircle } from "react-icons/bi";
import { BiSolidChevronLeftCircle } from "react-icons/bi";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
} from '@chakra-ui/react';

const steps = {
    1: TeamName,
    2: SelectGroup
}

export const NextPrevIcon = ({ onNext, onBack }) => {
    return (
        <div className='flex justify-between items-center px-6 pb-2 bg-slate-200 '>
            <BiSolidChevronLeftCircle
                onClick={() => onBack()}
                size={32}
                color='gray'
                name='Prev'
            />
            <BiSolidChevronRightCircle
                onClick={() => onNext()}
                size={32}
                color='gray'
                name='Next'
            />
        </div>
    )
}

export const CreateTeamModal = ({ setIsOpen, isOpen }) => {

    const [index, setIndex] = useState(1)
    const Step = steps[index]

    function onNext() {
        if (index < 2)
            setIndex(index + 1)
    }
    function onBack() {
        if (index > 1)
            setIndex(index - 1)
    }

    return (
        <Modal size={'2xl'} isOpen={isOpen} >
            <ModalOverlay />
            <Button
                className='absolute top-5 right-10'
                width={'16'}
                onClick={() => setIsOpen(!isOpen)}
                colorScheme='red'>
                Close
            </Button>

            <ModalContent>
                <ModalCloseButton
                    onClick={() => setIsOpen(!isOpen)}
                />
                <Step
                    onNext={onNext}
                    onBack={onBack}
                />
            </ModalContent>

        </Modal>
    )
}