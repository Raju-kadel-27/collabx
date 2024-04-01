import {
    Avatar,
    Button,
    Input,
    useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAddPostRepliesMutation } from "../redux/apis/PostApiSlice";
import { useSelector } from "react-redux";
import { userSelector } from "@/features/authentication/redux/slices/userSlice";

type ReplyPayload = {
    postId: string;
    ReplierId: string;
    content: string;
    parentId: string;
    isNestedReply: boolean;
}

export const ReplyInput = ({ postId }: { postId: string }) => {

    const user = useSelector(userSelector);

    const toast = useToast();

    const [addPostReplies, { error: replyError }] = useAddPostRepliesMutation()

    const [replyContent, setReply] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReply(e.target.value);
    };

    const handleReply = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            console.log(e.target);
            console.log('Handle reply button clicked', replyContent);
            let payload: ReplyPayload = {
                postId: postId,
                ReplierId: user._id,
                content: replyContent,
                parentId: "",
                isNestedReply: false
            };
            const response = await addPostReplies(payload)
            console.log({ response });
            console.log('Direct response from server info');
            if (replyError) {
                toast({
                    title: 'Error occured.',
                    description: "Failed to add reply",
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                })
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Something went out.',
                description: "Could not add reply.",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }
    };

    return (
        <div className="w-full mt-3 p-2">
            {/* <div className="flex space-x-2 items-center">
                <Avatar size={'sm'} name="Raju kadel" />
                <label>Raju kadel</label>
            </div>
            <div className="w-full  flex items-center space-x-2">
                <Input
                    onChange={handleChange}
                    variant='flushed'
                    px={4}
                    placeholder='Add a reply' />
                <Button
                    className="w-fit font-lato font-thin text-sm hover:cursor-pointer px-1"
                    bg={'gray.700'}
                    h={8}
                    w={14}
                    fontSize={'small'}
                    fontWeight={'sm'}
                    rounded={'none'}
                    _hover={{ bg: 'black' }}
                    colorScheme="black"
                    onClick={handleReply} >
                    Reply
                </Button>
            </div> */}
        </div>
    )
}
