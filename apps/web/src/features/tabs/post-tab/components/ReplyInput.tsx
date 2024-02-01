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
    }
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
            if(replyError){
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
        <div>
            <div className="flex space-x-2 items-center">
                <Avatar size={'sm'} name="Raju kadel" />
                <label>Raju kadel</label>
            </div>
            <div className="w-full flex items-center space-x-2">
                <Input
                    className="w-60"
                    onChange={handleChange}

                    variant='flushed'
                    placeholder='Flushed' />
                <Button
                    className="w-fit hover:cursor-pointer px-1"
                    bg={'black'}
                    rounded={'none'}
                    _hover={{
                        bg: 'black'
                    }}
                    onClick={handleReply}
                    colorScheme="blue">
                    Reply
                </Button>
            </div>
        </div>
    )
}
