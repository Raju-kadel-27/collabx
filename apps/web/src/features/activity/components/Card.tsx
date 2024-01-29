import React from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import { Avatar, Divider, Tooltip } from "@chakra-ui/react";
import { Badge } from '@chakra-ui/react';
import { FaCircle } from "react-icons/fa";
// import { useDeleteAnnouncementMutation } from "../redux/apis/AnnouncementApiSlice";

enum Priority {
    HIGH = "HIGH",
    MEDIUM = 'MEDIUM',
    LOW = "LOW"
}

enum Status {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done'
}

const FormatDate = {
    getMonth: (date: string) => { return 'Dec' },
    getDay: (date: string) => { return '04' },
    getWeekDay: (date: string) => { return 'Monday' }
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
    item: {
        announcer: any;
        attachments: any[];
        content: string;
        createdAt: string;
        priority: string;
        title: string;
        updatedAt: string;
        __v: number;
        _id: string;
    }
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
};

export const Card = ({ bgColor }: { bgColor: string }) => {

    // const [deleteAnnouncement, {
    //     isLoading,
    //     error,
    //     isError
    // }] = useDeleteAnnouncementMutation()

    // // console.log({
    // //     isLoading,
    // //     isError,
    // //     error
    // // })

    const color = BadgeColorProvider('HIGH');

    const handleClickDelete = async (e: React.MouseEvent<HTMLElement>) => {

        // const response = await deleteAnnouncement(item._id);

        // console.log({ response });
    }

    const handleClickUpdate = () => {

        // ref.current = item;

        // setOpen((prev: boolean) => !prev);

        // setModalType('update');
    }

    return (
        <>
            <div className={`flex ${bgColor} p-2`} >
                <div className="w-fit px-4">
                    <IoNotificationsCircleOutline size={28} />
                </div>
                <div className="mx-2 pr-1">
                    <Avatar bg={'blue.600'} color={'white'} size={'md'} name='Saru Khanal' />
                </div>
                <div className="font-lato flex-grow">
                    <div className="font-semibold flex items-center">
                        <p>Bishal Siwakoti liked your profile picture</p>
                        <Badge mx={2} colorScheme={color}>
                            High
                        </Badge>
                        <FaCircle size={6} color={'gray'} />
                        <Badge mx={2} colorScheme={'blue'}>
                            Raju kadel
                        </Badge>
                        <FaCircle size={6} color={'gray'} />
                        <Badge mx={2} colorScheme={'indigo'}>
                            2024
                            {/* {FormatDate.getWeekDay(item.createdAt)} */}
                        </Badge>
                        <FaCircle size={6} color={'gray'} />
                        <Badge mx={2} colorScheme={'green'}>
                            <span>
                                {/* {FormatDate.getMonth(item.createdAt)} */}
                                Dec 09
                            </span>
                            <span className="ml-1">
                                Monday
                            </span>
                        </Badge>
                    </div>
                    <p className="font-lato text-sm max-w-2xl">
                        {/* {item.content} */}
                        Ensure that your components are not being re-rendered unnecessarily. Use tools like React DevTools to inspect component updates and identify any components that are re-rendering more frequently than expected.
                    </p>
                    <div className="flex space-x-1 my-3">
                        <button
                            className="hover:cursor-pointer p-1 border-[1px]"
                            onClick={handleClickDelete}>
                            <Tooltip label="Delete" aria-label='A tooltip'>
                                <span><RiDeleteBin6Line size='16' /></span>
                            </Tooltip>
                        </button>
                        <button
                            className="hover:cursor-pointer p-1 border-[1px]"
                            onClick={handleClickUpdate}>
                            <Tooltip label="Update" aria-label='A tooltip'>
                                <span><MdOutlineUpdate size='16' /></span>
                            </Tooltip>
                        </button>
                    </div>
                </div>
            </div >

            <Divider />
        </>

    )
}