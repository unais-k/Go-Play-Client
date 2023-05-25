import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GroundViewReqApi } from "../../../API/Services/AdminRequest";
import ProfileCardComponent from "./Components/ProfileCardComponent";
import { message } from "antd";
import AboutCardComponent from "./Components/AboutCardComponent";
import ListEventComponent from "./Components/ListEventComponent";
import Loader from "../Layout/Loader";

function GroundViewComponent() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.adminLogin.token);
    const [viewData, setViewData] = useState([]);
    const [event, setEvent] = useState([]);
    const [loader, setLoader] = useState(false);
    const objId = useParams();
    const data = objId.id;

    const groundView = async () => {
        setLoader(true);
        const response = await GroundViewReqApi(data, token);
        if (response.status === 201) {
            setViewData(response.data.result);
            setEvent(response.data.event);
            setLoader(false);
        } else {
            message.error("Something went wrong");
        }
    };

    useEffect(() => {
        groundView();
    }, [""]);
    return (
        <div>
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <ProfileCardComponent viewData={viewData} />
                    <div className="w-full md:w-9/12 mx-2 h-64">
                        <AboutCardComponent viewData={viewData} />

                        <div className="my-4"></div>
                        {loader && <Loader />}
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="grid ms:grid-cols-1 ">
                                {/* <TimeSlot viewData={viewData} />
                                            <DetailsComponent groundId={viewData._id} /> */}
                                <ListEventComponent event={event} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroundViewComponent;
