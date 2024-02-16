import { GoFileMedia } from 'react-icons/go';
import { BsMic, BsEmojiSmile } from 'react-icons/bs';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';
import { EmojiPopOver } from './EmojiPopOver';
import { AudioMessagePopOver } from './AudioMessagePopover';
import { WebcamModal } from './WebcamModal';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';

export const MessagingTools = ({ handleEmoji }: { handleEmoji: any }) => {
    const [isOpen, setModal] = useState(false);
    console.log({ isOpen });
    return (
        <div className='flex ml-3 items-center space-x-4'>
            <Button onClick={() => setModal(!isOpen)} _hover={{ bg: 'none' }} bg={'gray.50'} >
                <AiOutlineCamera className='mr-[-20px]' size={27} color='black' />
            </Button>
            <AudioMessagePopOver />
            <GoFileMedia size={22} color='green' />
            <EmojiPopOver handleEmoji={handleEmoji} />
            <IoMdSend
                className="hover:cursor-pointer p-1 bg-blue-500 h-9 w-9 rounded-full hover:bg-blue-600 transition-all duration-300 ease-out"
                size={20}
                color="white"
            />

            <WebcamModal isOpen={isOpen} setModal={setModal} />
        </div>
    )
}

