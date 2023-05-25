import React from "react";
import ChatComponents from "../../Components/Turf-admin/Chat/ChatComponents";
import Sidebar from "../../Components/Turf-admin/SideBarComponents/components/Sidebar";

function Chat() {
    return (
        <div className="flex flex-auto h-full">
            <Sidebar />
            <div className="grow">
                <ChatComponents />
            </div>
        </div>
    );
}

export default Chat;
