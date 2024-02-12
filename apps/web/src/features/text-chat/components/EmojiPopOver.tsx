import { BsEmojiSmile } from 'react-icons/bs';
import { EmojiMart } from './EmojiMart';
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
} from '@chakra-ui/react';

export const EmojiPopOver = ({ handleEmoji }: { handleEmoji?: any }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button _hover={{ bg: 'none' }} bg={'gray.50'} >
                    <BsEmojiSmile size={22} color='orange' />
                </Button>
            </PopoverTrigger>
            <Portal >
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <EmojiMart handleEmoji={handleEmoji} />
                    <div className='absolute left-96 pl-3'>
                        <PopoverCloseButton color={'gray.200'} bg={'red.500'} size={20} />
                    </div>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}
