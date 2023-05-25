import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { EventBookingDetailViewReqApi } from "../../../../API/Services/AdminRequest";

function ListCardView() {
    const token = useSelector((state) => state.adminLogin.token);
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [events, setEvents] = useState([]);
    const params = useParams();
    const id = params.id;
    const FullDetails = async () => {
        const response = await EventBookingDetailViewReqApi(id, token);

        if (response.status === 201) {
            setDetails(response.data.result);
            setEvents(response.data.events);
        }
    };
    useEffect(() => {
        if (token) FullDetails();
    }, [token]);
    console.log(details);
    console.log(events);

    const handleSelectView = (id) => {
        // navigate(`admin/booking-view/${id}`);
    };

    return (
        <div>
            <div className=" my-5 p-5">
                <div className="w-full no-wrap md:-mx-2 ">
                    <div className="w-full md:w-9/12 mx-2 h-ft">
                        <div className="bg-white w-full p-3 shadow-sm rounded-sm">
                            <div className=" space-x-2 font-semibold text-gray-900 leading-8">
                                <div className="flex">
                                    <span className=" text-green-500 pt-1">
                                        <FaUserAlt size={20} />
                                    </span>
                                    <span className="tracking-wide">&nbsp;About</span>
                                </div>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Ground Name : </div>
                                        <div className="px-4 py-2">{details?.turf?.name}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Sport Selected</div>
                                        <div className="px-4 py-2">{details?.sport}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Starting Date</div>
                                        <div className="px-4 py-2">{new Date(details?.bookDate).toDateString()}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Ending Date</div>
                                        <div className="px-4 py-2">{new Date(details?.bookDate).toDateString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full ">
                    {events?.length > 0 ? (
                        <div className="bg-white shadow-md rounded my-6 h-96 overflow-auto ">
                            <table className="relative min-w-max w-full table-auto">
                                <thead className="">
                                    <tr className="bg-gray-200 rounded text-gray-600 uppercase text-sm leading-normal">
                                        {/* <th className="py-3 px-6 text-left">Turf Name</th> */}
                                        {/* <th className="py-3 px-6 text-center">Sport Selected</th> */}
                                        <th className="py-3 px-6 text-center">Date</th>
                                        <th className="py-3 px-6 text-center">Time</th>
                                        <th className="py-3 px-6 text-center">View</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {events?.length > 0 &&
                                        events?.map((state) => {
                                            return (
                                                <>
                                                    <tr
                                                        key={state._id}
                                                        className="border-b rounded border-gray-200 hover:bg-gray-100"
                                                    >
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex items-center justify-center">
                                                                {new Date(state?.bookDate).toDateString()}
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="font-medium items-center">
                                                                {state.time.map((res) => {
                                                                    return (
                                                                        <>
                                                                            <div className="flex flex-col">{res.slots}</div>
                                                                        </>
                                                                    );
                                                                })}
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div
                                                                onClick={() => handleSelectView(state?._id)}
                                                                className="flex item-center justify-center"
                                                            >
                                                                <AiFillFolderOpen size={23} />
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            {state?.status ? (
                                                                <div className=" font-medium">
                                                                    <span>{state?.status}</span>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    // onClick={() =>
                                                                    //     handleCancel({ id: state._id })
                                                                    // }
                                                                    className="font-medium"
                                                                >
                                                                    <div className="px-3 py-2">Pending</div>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <span> No Booking has done yet!...</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListCardView;
