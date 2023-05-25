import React from "react";
import CityPage from "../../Components/Admin/City/City";
import Layout from "../../Components/Admin/SideBarComponents/components/Layout"

function City() {
    return (
        // <div className="flex overflow-hidden">
        //     <SidebarPage />
        //     <div className="w-full">
        //         <CityPage />
        //     </div>
        // </div>
        <Layout>
            <CityPage />
        </Layout>
        
    );
}

export default City;
