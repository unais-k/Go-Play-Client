import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EventBookingDetailViewReqApi } from "../../../../../API/Services/ClientRequest";
import { AiFillFolderOpen } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import TableComponent from "./TableComponent";
import AboutComponent from "./AboutComponent";

function ViewComponent() {
    const token = useSelector((state) => state.userLogin.token);
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

    const handleSelectView = (id) => {
        navigate(`/booking-view/${id}`);
    };

    return (
        <div>
            <div className=" my-5 p-5">
                <div className="w-full no-wrap md:-mx-2 ">
                    <div className="w-full md:w-9/12 mx-2 h-fit">
                        <AboutComponent details={details} />

                        <div className="my-4"></div>
                    </div>
                </div>
                <div className="w-full ">
                    {events.length > 0 ? (
                        <div className="bg-white shadow-md rounded my-6 h-96 overflow-auto ">
                            <table className="relative min-w-max w-full table-auto">
                                <thead className="">
                                    <tr className="bg-gray-200 rounded text-gray-600 uppercase text-sm leading-normal">
                                        {/* <th className="py-3 px-6 text-left">Turf Name</th> */}
                                        {/* <th className="py-3 px-6 text-center">Sport Selected</th> */}
                                        <th className="py-3 px-6 text-center">Date</th>
                                        <th className="py-3 px-6 text-center">Time</th>
                                        <th className="py-3 px-6 text-center">View</th>
                                        <th className="py-3 px-6 text-center">Cancel</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {events?.length > 0 &&
                                        events?.map((state) => {
                                            return (
                                                <span key={state._id}>
                                                    <TableComponent handleSelectView={handleSelectView} event={state} />
                                                </span>
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

export default ViewComponent;
