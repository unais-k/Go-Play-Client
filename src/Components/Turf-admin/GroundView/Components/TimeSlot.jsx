import React, { useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { CancelTimeReqApi, EventDetailFetchReqApi, SelectedTimeReqApi } from "../../../../API/Services/TurfAdminRequest";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function TimeSlot({ eventData, movingDiv }) {
    const navigate = useNavigate();
    const token = useSelector((state) => state.turfAdminLogin.token);

    const [slots, setSlots] = useState([]);

    const handleCancel = async (id) => {
        const response = await CancelTimeReqApi({ id: id, groundId: eventData._id }, token);
        if (response.status === 200) {
            setSlots(response.data.result);
            message.warning("Slot canceled");
        } else {
            message.error("Something went wrong");
        }
    };

    const handleSelect = async (id) => {
        const response = await SelectedTimeReqApi({ id: id, groundId: eventData._id }, token);
        if (response.status === 200) {
            setSlots(response.data.result);
            message.success("Slot selected");
        } else {
            message.error("Something went wrong");
        }
    };

    const eventDetail = async (id) => {
        const response = await EventDetailFetchReqApi(id, token);

        if (response.status === 201) {
            setSlots(response.data.result.slots);
        }
    };

    useEffect(() => {
        if (eventData) {
            const id = eventData._id;
            eventDetail(id);
        }
    }, [eventData]);

    return (
        <div ref={movingDiv}>
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <BiTime size={20} color="green" />
                <span className="tracking-wide bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                    Time Management
                </span>
            </div>
            <ul className="list-inside space-y-2">
                {slots?.length === 0 ? (
                    <div>Please wait</div>
                ) : (
                    <div className="grid grid-cols-4 content-center gap-3">
                        {slots?.map((res) => {
                            return (
                                <>
                                    {res.status === true ? (
                                        <div
                                            className="me-2 bg-green-300 py-1 w-fit px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100 "
                                            key={Math.round(Math.random * 12 * 12 + 21)}
                                            onClick={() => handleCancel(res._id)}
                                        >
                                            {res.time}
                                        </div>
                                    ) : (
                                        <div
                                            className=" me-2 bg-gray-100 py-1 w-fit px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100 "
                                            key={Math.round(Math.random * 12 * 12 + 21)}
                                            onClick={() => handleSelect(res._id)}
                                        >
                                            {res.time}
                                        </div>
                                    )}
                                </>
                            );
                        })}
                    </div>
                )}
            </ul>
            <div>
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    className="rounded my-5 px-3 py-2 bg-lime-500 uppercase font-bold text-sm"
                >
                    Done
                </button>
            </div>
        </div>
    );
}

export default TimeSlot;
