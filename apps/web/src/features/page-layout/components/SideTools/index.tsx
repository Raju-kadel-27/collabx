import { IoSettingsOutline } from "react-icons/io5";
import { PiChatCircleDots } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { FaRegFile } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { getActiveIconType } from "../../utils/getActiveIconType";

enum IconType {
    ACTIVITY = 'activity',
    CHAT = 'chats',
    TEAMS = 'teams',
    CALENDAR = 'calendar',
    CALLS = 'calls',
    FILES = 'files',
    SETTING = 'settings',
};

const IconDetails = [
    {
        title: 'Activity',
        iconSize: 24,
        route: '/activity',
        type: IconType.ACTIVITY
    },
    {
        title: 'Chats',
        iconSize: 24,
        route: '/chats',
        type: IconType.CHAT
    },
    {
        title: 'Teams',
        iconSize: 24,
        route: '/teams',
        type: IconType.TEAMS
    },
    {
        title: 'Calendar',
        iconSize: 24,
        route: '/calendar',
        type: IconType.CALENDAR
    },
    {
        title: 'Calls',
        iconSize: 24,
        route: '/calls',
        type: IconType.CALLS
    },
    {
        title: 'Files',
        iconSize: 24,
        route: '/files',
        type: IconType.FILES
    },
    {
        title: 'Settings',
        iconSize: 24,
        route: '/settings',
        type: IconType.SETTING
    },
];

const IconProvider = (
    {
        type,
        iconSize = 24,
        iconColor = 'white'
    }: {
        type: string;
        iconSize: number;
        iconColor: string
    }
) => {
    switch (type) {
        case IconType.ACTIVITY:
            return <IoNotificationsOutline size={iconSize} color={iconColor} />
        case IconType.CHAT:
            return <PiChatCircleDots size={iconSize} color={iconColor} />
        case IconType.TEAMS:
            return <IoPeopleSharp size={iconSize} color={iconColor} />
        case IconType.CALENDAR:
            return <IoCalendarOutline size={iconSize} color={iconColor} />
        case IconType.SETTING:
            return <IoSettingsOutline size={iconSize} color={iconColor} />
        case IconType.CALLS:
            return <IoCallOutline size={iconSize} color={iconColor} />
        case IconType.FILES:
            return <FaRegFile size={iconSize} color={iconColor} />
        default:
            return;
    }
}

const IconRenderer = () => {

    const { pathname } = useLocation();
    const activeIconType = getActiveIconType(pathname || IconType.TEAMS);

    return (
        <>
            {
                IconDetails.map((icon, i) =>
                (
                    <div key={i} className="[&>.tooltip]:hover:opacity-100 h-14 w-16 cursor-pointer p-3">

                        <Link to={icon.route}>
                            <div className="border-gray pointer-events-auto absolute flex h-10 w-10 items-center justify-center rounded-full text-gray-200 shadow duration-100 hover:bg-gray-700">
                                <IconProvider
                                    type={icon.type}
                                    iconSize={icon.iconSize}
                                    iconColor={
                                        activeIconType === icon.type ?
                                            'white' : 'gray'
                                    }
                                />
                            </div>
                        </Link>

                        <div className="tooltip absolute z-50 mt-3 ml-14 w-max rounded-md bg-gray-700 p-1 text-xs text-white opacity-0 shadow-md duration-200">nts</div>
                    </div>
                ))
            }
        </>
    )
}

export const SideTools = () => {

    return (
        <div className="h-screen absolute left-0 bg-gray-100">
            <div className="fixed left-0 min-h-screen select-none border border-r-1 border-gray-800 bg-gray-900 shadow">
            {/* <div className="fixed left-0 min-h-screen select-none border border-r-1 border-[#441329] bg-[#3F0E40] shadow"> */}
                <IconRenderer />
            </div>
        </div>
    )
}

