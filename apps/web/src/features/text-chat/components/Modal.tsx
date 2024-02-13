import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
} from '@chakra-ui/react'
import { } from './ReactDateTime'

export const ModalChat = ({ setModal, isOpen }) => {
    return (
        <Modal isOpen={isOpen}>

            <ModalOverlay />

            <ModalContent bg={'yellow.200'} width={'full'}>

                <div className='p-4'>
                    <label className='font-lato my-1 m-1 font-semibold' htmlFor='delay-id'>Select your schedule time</label>
                    <Input
                        id='delay-id'
                        defaultChecked={true}
                        defaultValue={'02/09/2022'}
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                    />
                </div>

                <div className=''>

                    <div className='py-3 text-gray-700'>
                        <p className='px-4 font-bold '>Delay Message </p>
                        <p className='text-sm text-gray-900 py-3 font-lato pl-4 pr-4 pb-6 font-light'>Happy Birthday man !! Many many happy returns of the day. Hope, you will enjoy the best you can. Wishing forever.</p>
                    </div>

                    <div className='flex justify-end pb-3'>
                        <Button
                            color={'gray.100'}
                            borderRadius={'none'}
                            mb={2}
                            mx={2}
                            colorScheme='black'
                            bg={'black'}
                        >
                            Send Message
                        </Button>
                    </div>

                </div>


            </ModalContent>

        </Modal>
    )
}