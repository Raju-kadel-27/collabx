import { MdOutlineFormatBold } from "react-icons/md";
import { MdOutlineFormatItalic } from "react-icons/md";
import { MdAttachFile } from "react-icons/md";
import { BsEmojiNeutral } from "react-icons/bs";
import { Divider } from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";

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
        {
            title: 'Emoji',
            type: IconType.EMOJI,
            color: 'black',
            size: 19
        },
    ]

const IconRenderer = () => {
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
            </div>
            <div>
                <IconProvider
                    type={'send'}
                    size={20}
                    color={'black'}
                />
            </div>
        </div>
    )
};

export const MessageInput = () => {
    return (
        <div className="">
            <div className="border border-1 w-full border-gray-300">
                <div className="px-3 font-lato py-[5px] pt-[6px] pb-3 w-full">
                    <input
                        type="text"
                        className="w-full focus:outline-none outline-none"
                        placeholder="Enter your message" />
                </div>

                <div className="bg-slate-100">
                    <Divider />
                    <IconRenderer />
                </div>

            </div>
        </div>
    )
}
