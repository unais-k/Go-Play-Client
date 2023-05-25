import React from "react";
import EventBookedComponent from "./EventBookedComponent";
import SidebarComponent from "../../../Profile/Component/SidebarComponent";
import BreadCrumbComponent from "../../../Profile/Component/BreadCrumbComponent";

function Layout() {
    return (
        <div>
            <BreadCrumbComponent title={"Event"} />
            <div className="flex mt-5">
                <div className="sm:w-full md:w-3/12 lg:w-3/12">
                    <SidebarComponent />
                </div>
                <div className="sm:w-full h-screen md:w-9/12 lg:w-9/12">
                    <EventBookedComponent />
                </div>
            </div>
        </div>
    );
}

export default Layout;
