import React from "react";
import GroundListPageAdmin from "../../Components/Admin/GroundList/GroundList";
import Layout from "../../Components/Admin/SideBarComponents/components/Layout";

function GroundList() {
    return (
        // <div className="flex overflow-hidden">
        //     <SidebarPage />
        //     <div className="w-full">
        //         <GroundListPageAdmin />
        //     </div>
        // </div>
        <Layout>
            <GroundListPageAdmin />
        </Layout>
    );
}

export default GroundList;
