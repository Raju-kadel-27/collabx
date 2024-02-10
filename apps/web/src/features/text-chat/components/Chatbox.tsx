import "./styles.css";
import { SingleChat } from "./SingleChat";
import { ChatSidebar } from "./ChatSidebar";

export const ChatContainer = () => {
    return (
        <div className="grid w-full h-screen grid-cols-12">
            <div className="col-span-3 w-full">
                <ChatSidebar />
            </div>
            <div className="col-span-9 w-full">
                <SingleChat />
            </div>
        </div>
    );
};

