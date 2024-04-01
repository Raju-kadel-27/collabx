import { Outlet, useLocation } from "react-router";
import { SideTools } from "./features/page-layout/components/SideTools";
import { Sidebar } from "./features/page-layout/components/SideBar";

export default function PageLayout() {
    const location = useLocation();
    const pathname = location.pathname;
    console.log({pathname});
    const includeLayout = (pathname: string) => {
        if (pathname.startsWith('/room')) {
            return false
        }
        return true
    }
    return (
        <>
            <div className="flex h-screen w-full">
                {includeLayout(pathname) &&
                    <div className="z-50">
                        <SideTools />
                        <Sidebar />
                    </div>
                }
                <div className="flex-grow overflow-hidden h-full w-full">
                    <Outlet />
                </div>
            </div>
        </>
    )
}


