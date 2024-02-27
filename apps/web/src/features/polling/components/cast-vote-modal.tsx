import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    RadioGroup,
    Radio,
} from '@chakra-ui/react';

export const CastVoteModal = () => {
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclosure();
    const handleVote = () => {
        console.log('Handle Vote');
    };
    const handleChange = (e: any) => {
        console.log({ e });
    };
    return (
        <>
            <Button
                px={8}
                py={1}
                variant={'outline'}
                onClick={onOpen}
                marginLeft={36}
                colorScheme='green'>
                Submit your vote
            </Button>
            
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w={'50vw'}>
                    <ModalHeader className='bg-black font-bold font-lato text-white px-3'>Cast your vote</ModalHeader>
                    <ModalCloseButton className='text-gray-400' />
                    <ModalBody>
                        <RadioGroup onChange={handleChange} className='flex pt-5 flex-col space-y-2' defaultValue='1'>
                            <Radio colorScheme='red' value='1'>Blockchain</Radio>
                            <Radio colorScheme='blue' value='2'>Python</Radio>
                            <Radio colorScheme='green' value='3'>Virtual Reality</Radio>
                            <Radio colorScheme='yellow' value='4'>Augmented Reality</Radio>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant={'outline'}
                            mr={3}
                            onClick={handleVote}>
                            Vote Now
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
