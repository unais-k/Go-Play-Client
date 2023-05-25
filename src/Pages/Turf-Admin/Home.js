import React from "react";
import TurfHomePage from "../../Components/Turf-admin/Home/HomePage";
import Layout from "../../Components/Turf-admin/SideBarComponents/components/Layout";

function TurfAdminHome() {
    return (
        // <div className="w-full flex">
        //     <div className="w-1/5 fixed inset-0 md:relative sm:relative lg:relative lg:translate-x-0">
        //         <TurfAdminSidebarPage />
        //     </div>
        //     <div className="w-8/12 justify-center ">
        //         <TurfHomePage />
        //     </div>
        // </div>
        <Layout>
            <TurfHomePage/>
        </Layout>
    );
}

export default TurfAdminHome;
