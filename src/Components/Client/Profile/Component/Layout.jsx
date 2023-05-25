import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import ProfileEdit from "./ProfileEdit";
import BreadCrumbComponent from "./BreadCrumbComponent";
import { UserDataFetchReqApi, UserEditReqApi } from "../../../../API/Services/ClientRequest";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Layout() {
    const token = useSelector((state) => state.userLogin.token);
    const [clientData, setClientData] = useState([]);

    const userData = async () => {
        const response = await UserDataFetchReqApi(token);
        if (response.status === 201) {
            setClientData(response.data.result);
        }
    };
    const edit = async (e) => {
        e.preventDefault();
        const response = await UserEditReqApi(clientData, token);
        if (response.status === 201) toast.success("Profile updated");
    };
    useEffect(() => {
        token && userData();
    }, [token]);
    const editProfile = (e) => {
        setClientData({
            ...clientData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <BreadCrumbComponent title={"Profile"} />
            <div className="flex mt-5">
                <div className="sm:w-full md:w-3/12 lg:w-3/12">
                    <SidebarComponent />
                </div>
                <div className="sm:w-full h-screen md:w-9/12 lg:w-9/12">
                    <ProfileEdit editProfile={editProfile} edit={edit} user={clientData} />
                </div>
            </div>
        </div>
    );
}

export default Layout;
