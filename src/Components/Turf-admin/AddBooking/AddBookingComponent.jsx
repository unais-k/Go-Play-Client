import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GroundListReqApi } from "../../../API/Services/TurfAdminRequest";
import ListCardComponent from "./Components/ListCardComponent";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Loader from "../Layout/Loader";

function AddBookingComponent() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [state, setState] = useState([]);
    const [loader, setLoader] = useState(false);
    const [event, setEvent] = useState([]);

    const GroundList = async () => {
        setLoader(true);
        await GroundListReqApi(token).then((response) => {
            if (response.status === 201) {
                setState(response.data.result);
                setLoader(false);
            } else {
                message.error("No response in list req");
            }
        });
    };
    useEffect(() => {
        if (token) {
            GroundList();
        }
    }, [token]);

    const handleView = async (id) => {
        navigate("/turf-admin/booking-ground-view/" + id);
    };
    return (
        <div className="">
            <div className="container my-12 mx-auto px-4 md:px-12">
                {loader && <Loader />}
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {state.map((res) => {
                        return (
                            <div
                                key={res._id}
                                onClick={() => handleView(res._id)}
                                className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                            >
                                <ListCardComponent event={event} res={res} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AddBookingComponent;
