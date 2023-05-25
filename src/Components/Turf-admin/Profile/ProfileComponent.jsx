import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AdminEditReqApi, OwnerDataFetchReqApi } from "../../../API/Services/TurfAdminRequest";
import CardComponents from "./Components/CardComponents";
import FormComponents from "./Components/FormComponents";
import EditPhoto from "./Components/EditPhoto";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

function ProfileComponent() {
    const [data, setData] = useState([]);
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [showModal, setShowModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const ownerData = async () => {
        setLoader(true);
        const response = await OwnerDataFetchReqApi(token);
        if (response.status === 201) {
            setData(response.data.result);
            setLoader(false);
        }
    };

    const edit = async (e) => {
        e.preventDefault();
        const response = await AdminEditReqApi(data, token);
        if (response.status === 201) toast.success("Profile Updated");
    };

    useEffect(() => {
        if (token) ownerData();
    }, [token]);

    const editProfile = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex justify-center">
            {loader && <Loader />}
            <section className="flex space-x-10 w-10/12 bg-blueGray-50 pt-16">
                <div>
                    <CardComponents setShowModal={setShowModal} data={data} />
                </div>
                {showModal && <EditPhoto setShowModal={setShowModal} />}
                <div className="w-full lg:w-10/12 px-4 mx-auto">
                    <FormComponents editProfile={editProfile} edit={edit} data={data} />
                </div>
            </section>
        </div>
    );
}

export default ProfileComponent;
