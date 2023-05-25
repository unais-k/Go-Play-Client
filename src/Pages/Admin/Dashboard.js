import React from "react";
import DashboardPageAdmin from "../../Components/Admin/Dashboard/Dashboard";
import Layout from "../../Components/Admin/SideBarComponents/components/Layout";

function AdminDashboard() {
    return (
        // <div className="flex">
        //     <SidebarPage />
        //     <DashboardPageAdmin />
        // </div>
        <Layout>
            <DashboardPageAdmin/>
        </Layout>
    );
}

export default AdminDashboard;
