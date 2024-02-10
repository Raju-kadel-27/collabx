import { BsEmojiSmile, BsMic } from 'react-icons/bs'
import { AudioRecorder } from 'react-audio-voice-recorder';
import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Portal,
    ModalContent,
} from '@chakra-ui/react';

export const AudioMessagePopOver = () => {

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
    };
    return (
        <Popover>
            <PopoverTrigger>
                <Button _hover={{ bg: 'none' }} bg={'gray.50'} >
                    <BsMic size={22} color='black' />
                </Button>
            </PopoverTrigger>
            <Portal >
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader fontWeight={'medium'}>Press mic button</PopoverHeader>
                    {/* <PopoverCloseButton /> */}
                    <PopoverBody>
                        <AudioRecorder
                            onRecordingComplete={addAudioElement}
                            audioTrackConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                            }}
                            downloadOnSavePress={true}
                            downloadFileExtension="webm"
                        />
                    </PopoverBody>
                    <div className='absolute left-96 '>
                        <PopoverCloseButton color={'gray.200'} bg={'red.500'} size={20} />
                    </div>

                </PopoverContent>
            </Portal>
        </Popover>
    )
}






