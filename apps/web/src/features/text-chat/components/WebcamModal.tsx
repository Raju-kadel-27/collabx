import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { WebcamCapture } from './WebcamCapture'

export const WebcamModal = ({ setModal, isOpen }) => {

    return (
        <Modal isOpen={isOpen}>
            <Button w={'fit-content'}
                colorScheme='red'
                onClick={() => setModal(!isOpen)}>
                Close</Button>
            <ModalOverlay />
            <ModalContent width={'100vw'}>
                <WebcamCapture />
            </ModalContent>
        </Modal>
    )
}