import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { VideoPlayer } from '../../../embedded/video-player/VideoPlayer';

const VideoPlayerModal = () => {
    return (
        function ReturnFocus() {
            const { isOpen, onOpen, onClose } = useDisclosure()
            const finalRef = React.useRef(null)

            return (
                <>
                    <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
                        Some other content that'll receive focus on close.
                    </Box>

                    <Button mt={4} onClick={onOpen}>
                        Open Modal
                    </Button>

                    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <VideoPlayer />
                        </ModalContent>
                    </Modal>
                </>
            )
        }
    )
}

export default VideoPlayerModal