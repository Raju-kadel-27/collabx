import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    Input,
    FormLabel
} from '@chakra-ui/react'
import { StepsBody } from '../steps/StepsBody'

export const StepsModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>
            <Button ml={4} ref={finalRef}>
                I'll receive focus on close
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size={'3xl'}

            >

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Youtube Streaming</ModalHeader>

                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {/* <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl> */}

                        <StepsBody />

                    </ModalBody>

                    <ModalFooter>
                        {/* <Button colorScheme='red' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


