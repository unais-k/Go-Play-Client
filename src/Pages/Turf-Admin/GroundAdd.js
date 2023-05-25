import React from "react";
import AddGroundPage from "../../Components/Turf-admin/AddGround/AddGround";
import Layout from "../../Components/Turf-admin/SideBarComponents/components/Layout";

function GroundAdd() {
    return (
        // <div className="w-full flex">
        //     <div className="w-1/5 fixed inset-0 md:relative sm:relative lg:relative lg:translate-x-0">
        //         <TurfAdminSidebarPage />
        //     </div>
        //     <div className="w-8/12 justify-center ">
        //         <AddGroundPage />
        //     </div>
        // </div>
        <Layout>
            <AddGroundPage/>
        </Layout>
    );
}

export default GroundAdd;
