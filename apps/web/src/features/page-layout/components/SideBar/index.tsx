import { ChatSidebar } from "@/features/text-chat/components/ChatSidebar";
import { useLocation } from "react-router";
import { getActiveSidebarType } from "../../utils/getActiveSidebarType";
import { TeamSidebar } from "@/features/Team/components/Sidebar";
// import { Calendar } from "@/features/calendar/components/Calendar";
import { CiSquarePlus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { openModal } from "@/features/Team/redux/slices/team";
import Example from './Example'

enum SidebarType {
    ACTIVITY = 'activity',
    CHAT = 'chats',
    TEAMS = 'teams',
    CALENDAR = 'calendar',
    SETTING = 'settings',
    CALLS = 'calls',
    FILES = 'files',
};
const PessimistDesign = () => {
    try {
        let boolean;
        if (boolean) {
            try {
                boolean = 'string';
                boolean = 'object';
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}
const handleClickMutaion = () => {

    try {
        console.log('Handling apache cassandra:: Database')
    } catch (error) {
        console.log({ error })
    }
}
const SidebarWidthProvider = ({ type }: { type: string }) => {
    switch (type) {
        case SidebarType.ACTIVITY:
            return '0px'

        case SidebarType.CHAT:
            return '0px'

        case SidebarType.TEAMS:
            return '236px'

        case SidebarType.CALENDAR:
            return '200px'

        case SidebarType.SETTING:
            return '0px'

        case SidebarType.CALLS:
            return '200px'

        case SidebarType.FILES:
            return '203px'
        default:
            return
    }
}

const SidebarProvider = ({ type }: { type: string }) => {
    switch (type) {
        case SidebarType.ACTIVITY:
            return <Example />

        case SidebarType.CHAT:
            return <ChatSidebar />

        case SidebarType.TEAMS:
            return <TeamSidebar />

        case SidebarType.CALENDAR:
            return <TeamSidebar />

        case SidebarType.SETTING:
            return <Example />

        case SidebarType.CALLS:
            return <Example />

        case SidebarType.FILES:
            return <Example />
        default:
            return
    }
};

const CreateTeamButton = () => {
    const dispatch = useDispatch()

    const handleCreateTeam = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log({ e })
        dispatch(openModal({
            isModalOpen: true,
            modalType: 'Create Team'
        }))
    }
    return (
        <div
            onClick={handleCreateTeam}
            className="my-3 mt-auto border border-1 border-red-500 mx-5 p-1 rounded-sm flex cursor-pointer">
            <div className="flex space-x-1 justify-center items-center">
                <CiSquarePlus color={'red'} size={24} />
                <p className="hover:text-red-500 px-2 text-md text-red-500">
                    Create Team
                </p>
            </div>
        </div>
    )
};

export const Sidebar = () => {
    const { pathname } = useLocation();
    const currentSidebarType = getActiveSidebarType(pathname || SidebarType.TEAMS);
    return (
        <div className="h-screen ml-16 w-fit bg-gray-50">
            {/* #121417,#2F343D,#2F343D,#ABB2BF,#2F343D,#ABB2BF,#98C379,#98C379,#2F343D,#ABB2BF */}
            {/* #3F0E40,#350d36,#1164A3,#FFFFFF,#350D36,#FFFFFF,#2BAC76,#CD2553,#350d36,#FFFFFF */}
            <div
                style={{
                    width: SidebarWidthProvider({ type: currentSidebarType })
                }}
                className="flex h-full flex-col overflow-hidden bg-gray-900 text-white">
                {/* className="flex h-full flex-col overflow-hidden bg-[#3F0E40] text-white"> */}

                <h1 className="mt-5 ml-10 text-xl text-slate-100 font-bold">CollabX</h1>

                <SidebarProvider
                    type={currentSidebarType}
                />

                <CreateTeamButton />

            </div>

        </div>

    );
}
