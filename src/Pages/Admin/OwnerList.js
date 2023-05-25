import React from "react";
import OwnerListPage from "../../Components/Admin/OwnerList/OwnerListPage";
import Layout from "../../Components/Admin/SideBarComponents/components/Layout";

function OwnerList() {
    return (
        // <div className="flex overflow-hidden">
        //     <SidebarPage />
        //     <div className="w-full">
        //         <OwnerListPage />
        //     </div>
        // </div>
        <Layout>
            <OwnerListPage/>
        </Layout>
    );
}

export default OwnerList;
