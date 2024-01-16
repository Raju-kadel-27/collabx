import { Outlet } from "react-router";
import { SideTools } from "./features/page-layout/components/SideTools";
import { Sidebar } from "./features/page-layout/components/SideBar";

export const PageLayout = () => {
    return (
        <>
            <div className="flex h-screen w-full">
                <div className="z-50">
                    <SideTools />
                    <Sidebar />
                </div>
                <div className="flex-grow overflow-hidden h-full w-full">
                    <Outlet />
                </div>
            </div>
        </>
    )
}


