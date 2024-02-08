import { MdOutlineFormatBold } from "react-icons/md";
import { MdOutlineFormatItalic } from "react-icons/md";
import { MdAttachFile } from "react-icons/md";
import { BsEmojiNeutral } from "react-icons/bs";
import { Divider } from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { useCreatePostMutation } from "../redux/apis/PostApiSlice";
import { selectAccessToken, userSelector } from "@/features/authentication/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { EmojiPopOver } from "@/features/text-chat/components/EmojiPopOver";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { SignalingManager } from "@/features/websocket/SignalingManager";

enum IconType {
    BOLD = 'bold',
    ITALIC = 'italic',
    ATTACHMENTS = 'attachments',
    EMOJI = 'emoji',
    SEND = 'send'
}
interface IconProvider {
    type: string;
    size: number;
    color: string;
}
const IconProvider = ({ type, size, color }: IconProvider) => {
    switch (type) {
        case IconType.BOLD:
            return <MdOutlineFormatBold size={size} color={color} />
        case IconType.ATTACHMENTS:
            return <MdAttachFile size={size} color={color} />
        case IconType.ITALIC:
            return <MdOutlineFormatItalic size={size} color={color} />
        case IconType.EMOJI:
            return <BsEmojiNeutral size={size} color={color} />
        case IconType.SEND:
            return <AiOutlineSend size={size} color={color} />
    }
}

//My plans for today
// 01:Fallback Ui
// 02: Sentry Initialization
// TODO: @hkirat

const IconInfo =
    [
        {
            title: 'Bold',
            type: IconType.BOLD,
            color: 'black',
            size: 22
        },
        {
            title: 'Italic',
            type: IconType.ITALIC,
            color: 'black',
            size: 20
        },
        {
            title: 'Attachments',
            type: IconType.ATTACHMENTS,
            color: 'black',
            size: 20
        },
        // {
        //     title: 'Emoji',
        //     type: IconType.EMOJI,
        //     color: 'black',
        //     size: 19
        // },
    ]

const IconRenderer = ({ handleSendMessage, handleEmoji }: any) => {
    return (
        <div className="flex items-center justify-between pr-4">
            <div className="flex items-center pt-2 pb-1 px-3 space-x-4">
                {
                    IconInfo.map((icon) => (
                        <div>
                            <IconProvider
                                type={icon.type}
                                size={icon.size}
                                color={icon.color}
                            />
                        </div>
                    ))
                }
                <EmojiPopOver handleEmoji={handleEmoji} />
            </div>

            <button onClick={handleSendMessage}>
                <IconProvider
                    type={'send'}
                    size={20}
                    color={'black'}
                />
            </button>
        </div>
    )
};

export const MessageInput = () => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const jwtToken = useSelector(selectAccessToken);
    const user = useSelector(userSelector);
    const { userName, isAdmin } = useAuth();
    const [createPost] = useCreatePostMutation();
    const [message, setMessage] = useState<string>('');
    console.log({ userName, isAdmin });

    useEffect(() => {
        const initWs = async () => {
            if (user && jwtToken) {
                try {
                    const Instance = SignalingManager.getInstance();
                    console.log({ Instance });
                    Instance.updateUuid(user._id, jwtToken);
                } catch (error) {
                    console.log({ error })
                }
            }
        }
        initWs();
    }, [])

    const handleEmoji = (e: any) => {
        let sym = e.unified.split("-");
        let codesArray: any = [];
        sym.forEach((el: any) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        console.log({ emoji }, 'Emojis---value are rendered here in the picker component...')
        setMessage(message + emoji);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    };

    const handleKeyDown = async (e: any) => {

        if (e.key === 'Enter'
            && message.length
        ) {
            var payload = {
                teamId: "658e4ef2010b43d97abb706e",
                channelId: "658e4f79010b43d97abb7073",
                authorId: user._id,
                content: message
            };

            const response = await createPost(payload);

            console.log({ response });

            console.log('Listening messages from ui-logger components...')

            setMessage('')
        }
    };

    const handleSendMessage = async (e: any) => {
        if (
            message.length > 0
        ) {
            var payload = {
                teamId: "658e4ef2010b43d97abb706e",
                channelId: "658e4f79010b43d97abb7073",
                authorId: user._id,
                content: message
            };

            const response = await createPost(payload);

            console.log({ response });

            setMessage('')
        }
    };
    const handleBoldClick = () => {
        const selectedText = textareaRef.current.value.substring(
            textareaRef.current.selectionStart,
            textareaRef.current.selectionEnd
        );
        const boldText = `**${selectedText}**`;

        const beforeSelection = textareaRef.current.value.substring(0, textareaRef.current.selectionStart);
        const afterSelection = textareaRef.current.value.substring(textareaRef.current.selectionEnd);

        const newInputValue = beforeSelection + boldText + afterSelection;
        textareaRef.current.value = newInputValue;
    };
    const handleItalicClick = () => {
        const selectedText = textareaRef.current.value.substring(
            textareaRef.current.selectionStart,
            textareaRef.current.selectionEnd
        );
        const italicText = `*${selectedText}*`;

        const beforeSelection = textareaRef.current.value.substring(0, textareaRef.current.selectionStart);
        const afterSelection = textareaRef.current.value.substring(textareaRef.current.selectionEnd);

        const newInputValue = beforeSelection + italicText + afterSelection;
        textareaRef.current.value = newInputValue;
    };
    return (
        <div className="">
            <div className="border border-1 w-full border-gray-300">
                <div className="px-3 font-lato pb-3 w-full">
                    <div>
                        <textarea
                            onChange={handleChange}
                            value={message}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your message"
                            ref={textareaRef}
                            style={{
                                resize: 'none',
                                height: '30px'
                            }}
                            className="w-full pt-1 focus:outline-none outline-none"
                        >
                        </textarea>
                    </div>
                    {/* <input
                        onChange={handleChange}
                        value={message}
                        onKeyDown={handleKeyDown}
                        type="text"
                        className="w-full focus:outline-none outline-none"
                        placeholder="Enter your message" /> */}
                </div>
                <div className="bg-slate-100">
                    <Divider />
                    <IconRenderer
                        handleEmoji={handleEmoji}
                        handleSendMessage={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    )
};



