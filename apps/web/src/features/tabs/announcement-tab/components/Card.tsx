import React from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import { Divider } from "@chakra-ui/react";
import { Badge } from '@chakra-ui/react'

enum Priority {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}

const BadgeColorProvider = (type: string) => {
    switch (type) {
        case Priority.HIGH:
            return 'red';
        case Priority.MEDIUM:
            return 'orange';
        case Priority.LOW:
            return 'purple'
    }
}

interface CardProps {
    priority: string;
    announcementContent: string;
    day: string;
    date: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Card = ({
    priority,
    announcementContent,
    day,
    date,
    setOpen
}: CardProps) => {

    const color = BadgeColorProvider(priority)

    const handleClickDelete = (e: React.MouseEvent<HTMLElement>) => {
        console.log({ e })
    }
    const handleClickUpdate = (e: React.MouseEvent<HTMLElement>) => {
        console.log({ e })
        setOpen((prev: boolean) => !prev)
    }

    return (
        <>
            <div
                className={`flex p-4`} >
                <div className="w-fit px-4">
                    <HiSpeakerphone size={28} />
                </div>
                <div className="font-lato flex-grow">
                    <p className="font-semibold">
                        About Techfest
                        <Badge mx={2} colorScheme={color}>{priority}</Badge>
                    </p>
                    <p className="font-lato max-w-xl">
                        {announcementContent}
                    </p>
                </div>
                <div className="px-4 w-48 mx-4">
                    <p className="text-black bg-gray-100 w-fit rounded-lg px-2 font-semibold font-lato text-md my-1">
                        {day}
                    </p>
                    <p className="text-black font-lato text-sm ">
                        {date}
                    </p>

                    <div className="flex space-x-3 my-3">
                        <button className="hover:cursor-pointer" onClick={handleClickDelete}>
                            <RiDeleteBin6Line size='20' />
                        </button>
                        <button className="hover:cursor-pointer" onClick={handleClickUpdate}>
                            <MdOutlineUpdate size='20' />
                        </button>
                    </div>
                </div>
            </div >
            <Divider />
        </>

    )
}