import { ChatSidebar } from "@/features/text-chat/components/ChatSidebar";
import { useLocation } from "react-router";
import { getActiveSidebarType } from "../../utils/getActiveSidebarType";
import { TeamSidebar } from "@/features/Team/components/Sidebar";
import { CollabxCalendar } from "@/features/calendar/components/Calendar";
import { CiSquarePlus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { openModal } from "@/features/Team/redux/slices/team";

enum SidebarType {
    ACTIVITY = 'activity',
    CHAT = 'chats',
    TEAMS = 'teams',
    CALENDAR = 'calendar',
    SETTING = 'settings',
    CALLS = 'calls',
    FILES = 'files',
};

const Example = () => {
    return (
        <div> </div>
    )
};

const SidebarWidthProvider = ({ type }: { type: string }) => {
    switch (type) {
        case SidebarType.ACTIVITY:
            return '200px'

        case SidebarType.CHAT:
            return '200px'

        case SidebarType.TEAMS:
            return '220px'

        case SidebarType.CALENDAR:
            return '200px'

        case SidebarType.SETTING:
            return '200px'

        case SidebarType.CALLS:
            return '200px'

        case SidebarType.FILES:
            return '200px'
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
            return <CollabxCalendar />

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
            className="my-3 mt-auto border border-1 border-slate-100 mx-5 p-1 rounded-sm flex cursor-pointer">
            <div className="flex space-x-1 justify-center items-center">
                <CiSquarePlus size={24} />
                <p className="hover:text-gray-400 text-md text-gray-300">Create a Team</p>
            </div>
        </div>
    )
};


export const Sidebar = () => {

    const { pathname } = useLocation();
    const currentSidebarType = getActiveSidebarType(pathname || SidebarType.TEAMS);

    return (
        <div className="h-screen ml-16 w-fit bg-gray-50">

            <div
                style={{
                    width: SidebarWidthProvider({ type: currentSidebarType })
                }}
                className="flex h-full flex-col overflow-hidden bg-[#37051b] text-white">

                <h1 className="mt-5 ml-10 text-xl text-slate-100 font-bold">CollabX</h1>

                <SidebarProvider
                    type={currentSidebarType}
                />

                <CreateTeamButton />

            </div>

        </div>

    );
}
