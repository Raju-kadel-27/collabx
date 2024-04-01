import { BsEmojiNeutral } from "react-icons/bs";
import { BsReply } from "react-icons/bs";
import { IoSadOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { PiHandsClapping } from "react-icons/pi";
import { FaRegFaceAngry } from "react-icons/fa6";
import { BsEmojiSurprise } from "react-icons/bs";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    useToast,
} from '@chakra-ui/react';
import { useIncreamentPostReactionMutation } from "../redux/apis/PostApiSlice";
import { useSelector } from "react-redux";
import { userSelector } from "@/features/authentication/redux/slices/userSlice";
import { ReplyInput } from "./ReplyInput";

type EmojiPayload = {
    postId: string;
    reactionType: string;
    reactorUserId: string;
}

type ReplyPayload = {
    postId: string;
    toId: number;
    from: string
}

type ReplayPayload={
    totalCount: string;
    postId: string;
    
}
// write single responsibility function
// ahead of 99% of developers
export const ReactionButton = ({ postId }: { postId: string }) => {
    // In mongodb, you can define object in schema like hashmap
    // And addreaction count by key like any objectMap

    const user = useSelector(userSelector);

    const [increamentPostReaction, { error: reactionError }] = useIncreamentPostReactionMutation()

    const toast = useToast();

    const handleEmoji = async (type: string) => {
        try {
            console.log(type);
            let payload: EmojiPayload = {
                postId,
                reactionType: type,
                reactorUserId: user._id
            }
            const response = await increamentPostReaction(payload);
            console.log({ response });
            if (reactionError) {
                toast({
                    title: 'Error occured.',
                    description: "Could not add replies.",
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                })
            }
        } catch (error) {
            console.log({ error });
            toast({
                title: 'Something went out.',
                description: "Could not add reaction",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    };
    const manageReactionButton = () => {
        console.log('Manage Reaction Button in Nepal')l
        let isAdmin = false;
        if (isAdmin) {
            let isManager = !!isAdmin;
            console.log({ isManager });
        }
    }
    return (
        <>
            <div className="flex items-center space-x-2">
                <Popover>
                    <PopoverTrigger>
                        <Button
                            _hover={{ bg: 'white' }}
                            className="hover:ease-out  hover:duration-300 hover:transition-all hover:bg-white"
                            bg={'white'}>
                            <BsEmojiNeutral className='hover:text-yellow-500' size={20} color={'black'} />
                            <span className="text-black font-thin px-2 font-lato">27</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody
                            className='bg-slate-900 rounded-full w-full px-auto mx-auto transition-all duration-500 ease-out  flex space-x-5'
                        >
                            <BsEmojiSurprise className='animate-bounce ml-8 hover:cursor-pointer' color={'orange'} size={26} onClick={() => handleEmoji('wow')} />
                            <FaHeart className='animate-bounce hover:cursor-pointer' color='red' size={24} onClick={() => handleEmoji('love')} />
                            <PiHandsClapping className='animate-bounce hover:cursor-pointer' color={'green'} size={24} onClick={() => handleEmoji('celebrate')} />
                            <IoSadOutline className='animate-bounce hover:cursor-pointer' color={'orange'} size={24} onClick={() => handleEmoji('sad')} />
                            <FaRegFaceAngry className='animate-bounce hover:cursor-pointer' color={'red'} size={24} onClick={() => handleEmoji('angry')} />
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <div className="flex space-x-1 items-center">
                    <BsReply
                        size={20}
                        color={'black'} />
                    <p className="font-lato text-black font-thin">27 replies</p>
                </div>
            </div>
            {/* <Divider className="pb-2 mb-2" /> */}
            <ReplyInput
                postId={postId} />
            {/* <Divider colorScheme="gray" /> */}
        </>
    )
}
