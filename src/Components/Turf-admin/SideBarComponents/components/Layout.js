import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <>
            <div className="flex flex-auto">
                <Sidebar />
                <div className="grow">
                    {/* <Navbar /> */}
                    <div className="">{children}</div>
                </div>
            </div>
        </>
    );
};

export default Layout;
