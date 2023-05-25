import React from "react";
import ChatComponent from "../../Components/Admin/Chat/ChatComponent";
import Sidebar from "../../Components/Admin/SideBarComponents/components/Sidebar";

function Chat() {
    return (
        <div className="flex flex-auto h-screen">
            <Sidebar />
            <div className="grow">
                <ChatComponent />
                {/* <div className="m-5">{children}</div> */}
            </div>
        </div>
    );
}

export default Chat;
