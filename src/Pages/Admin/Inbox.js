import React from "react";
import Layout from "../../Components/Admin/SideBarComponents/components/Layout";
import InboxMain from "../../Components/Admin/Inbox/InboxMain";

function Inbox() {
    return (
        // <div className="flex">
        //     <SidebarPage />
        //     <div className=" flex h-fit">
        //         <InboxPage />
        //     </div>
        // </div>
        <Layout>
            <InboxMain />
        </Layout>
    );
}

export default Inbox;
