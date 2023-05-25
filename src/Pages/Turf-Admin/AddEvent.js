import React from "react";
import AddEventComponent from "../../Components/Turf-admin/AddEvent/AddEventComponent";
import Layout from "../../Components/Turf-admin/SideBarComponents/components/Layout";

function AddEvent() {
    return (
        // <div className="w-full flex">
        //     <div className="w-1/5 fixed inset-0 md:relative sm:relative lg:relative lg:translate-x-0">
        //         <TurfAdminSidebarPage />
        //     </div>
        //     <div className="w-8/12 justify-center ">
        //         <AddEventComponent />
        //     </div>
        // </div>
        <Layout>
            <AddEventComponent/>
        </Layout>
    );
}

export default AddEvent;
