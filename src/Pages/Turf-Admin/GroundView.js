import React from "react";
import GroundViewPage from "../../Components/Turf-admin/GroundView/GroundViewPage";
import Layout from "../../Components/Turf-admin/SideBarComponents/components/Layout";

function GroundView() {
    return (
        // <div className="w-full flex">
        //     <div className="w-1/5 fixed inset-0 md:relative sm:relative lg:relative lg:translate-x-0">
        //         <TurfAdminSidebarPage />
        //     </div>
        //     <div className="">
        //         <GroundViewPage />
        //     </div>
        // </div>
        <Layout>
            <GroundViewPage/>
        </Layout>
    );
}

export default GroundView;
