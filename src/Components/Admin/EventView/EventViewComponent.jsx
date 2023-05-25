import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { EventDetailFetchReqApi } from "../../../API/Services/AdminRequest";
import ProfileCardComponent from "./ProfileCardComponent";

function EventViewComponent() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.adminLogin.token);
    const params = useParams();
    const [state, setState] = useState([]);
    const [ground, setGround] = useState([]);
    const [rows, setRows] = useState([]);
    const eventId = params.id;

    const eventDetail = async () => {
        const response = await EventDetailFetchReqApi(eventId, token);

        if (response.status === 201) {
            setState(response.data.result);
            setGround(response.data.result.groundId);
            setRows(response.data.result.slots);
        }
    };

    useEffect(() => {
        if (eventId) {
            eventDetail();
        }
    }, [eventId]);

    return (
        <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-slate-700">
            <div
                onClick={() => {
                    navigate(-1);
                }}
                className="px-3 py-2 bg-stone-100 uppercase text-xs tracking-wider font-bold w-fit"
            >
                Back
            </div>
            <div className="p-5">
                <div className="flex p-8 bg-white">
                    <ProfileCardComponent ground={ground} state={state} />
                    <div className="w-10/12">
                        <h2 className="text-center m-5 font-bold text-2xl ">Slots Given</h2>
                        <div className="">
                            <div className="flex flex-wrap justify-center items-center pb-10">
                                {rows.length > 0 &&
                                    rows?.map((res) => {
                                        return (
                                            <span key={res._id}>
                                                <div key={res._id}>
                                                    {res.status ? (
                                                        <>
                                                            <button className="px-4 py-2 m-2 uppercase rounded bg-gray-200 text-dark">
                                                                {res.time}
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </span>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventViewComponent;
