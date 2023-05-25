import React, { useState } from "react";
import BreadCrumbComponent from "../../Profile/Component/BreadCrumbComponent";
import SidebarComponent from "../../Profile/Component/SidebarComponent";
import MainComponent from "./MainComponent";
import { useSelector } from "react-redux";
import { ChangePasswordReqApi } from "../../../../API/Services/ClientRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Layout() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.userLogin.token);
    const [password, setPassword] = useState("");

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (password.confirmPassword !== password.password) {
            toast.warning("Password is not match");
        } else {
            const response = await ChangePasswordReqApi(password, token);
            if (response.status === 201) {
                toast.success("Password changed");
                navigate(-1);
            }
        }
    };
    return (
        <div>
            <BreadCrumbComponent title={"Change Password"} />
            <div className="flex mt-5">
                <div className="sm:w-full md:w-3/12 lg:w-3/12">
                    <SidebarComponent />
                </div>
                <div className="sm:w-full h-screen md:w-9/12 lg:w-9/12">
                    <MainComponent handlePasswordSubmit={handlePasswordSubmit} setPassword={setPassword} />
                </div>
            </div>
        </div>
    );
}

export default Layout;
