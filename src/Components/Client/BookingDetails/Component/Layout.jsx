import React from "react";
import BreadCrumbComponent from "../../Profile/Component/BreadCrumbComponent";
import SidebarComponent from "../../Profile/Component/SidebarComponent";
import BookingList from "./BookingList";

function Layout() {
    return (
        <div>
            <BreadCrumbComponent title={"Booking"} />
            <div className="flex mt-5">
                <div className="sm:w-full md:w-3/12 lg:w-3/12">
                    <SidebarComponent />
                </div>
                <div className="sm:w-full h-screen md:w-9/12 lg:w-9/12">
                    <BookingList />
                </div>
            </div>
        </div>
    );
}

export default Layout;
