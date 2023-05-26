import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillFolderOpen } from "react-icons/ai";
import { CancelBookingReqApi, UserBookingDetailFetchReqApi } from "../../../../API/Services/ClientRequest";
import { useNavigate } from "react-router-dom";

function BookingList({ setLoader }) {
    const navigate = useNavigate();
    const token = useSelector((state) => state.userLogin.token);
    const [bookings, setBookings] = useState([]);

    const data = async () => {
        setLoader(true);
        const response = await UserBookingDetailFetchReqApi(token);

        if (response.status === 201) {
            setBookings(response.data.result);
            setLoader(false);
        }
    };

    useEffect(() => {
        token && data();
    }, [token]);

    const handleSelectView = (id) => {
        navigate(`/booking-view/${id}`);
    };

    const handleCancel = async (id) => {
        const response = await CancelBookingReqApi(id, token);
        if (response.status === 201) {
            setBookings(response.data.result);
        }
    };

    return (
        <div>
            <div className="text-lime-600 font-semibold text-2xl mb-5">My Bookings</div>
            <div>
                <div className="">
                    <div className="overflow-x-auto">
                        <div className="min-w-screen  rounded ps-5 justify-center  font-sans overflow-hidden">
                            <div className="w-full ">
                                {bookings.length > 0 ? (
                                    <div className="bg-white shadow-md rounded my-6 h-96 overflow-auto ">
                                        <table className="relative min-w-max w-full table-auto">
                                            <thead className="">
                                                <tr className="bg-gray-200 rounded text-gray-600 uppercase text-sm leading-normal">
                                                    <th className="py-3 px-6 text-left">Turf Name</th>
                                                    <th className="py-3 px-6 text-center">Sport Selected</th>
                                                    <th className="py-3 px-6 text-center">Date</th>
                                                    <th className="py-3 px-6 text-center">Time</th>
                                                    <th className="py-3 px-6 text-center">View</th>
                                                    <th className="py-3 px-6 text-center">Cancel</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-sm font-light">
                                                {bookings?.length > 0 &&
                                                    bookings?.map((state) => {
                                                        return (
                                                            <tr
                                                                key={state._id}
                                                                className="border-b rounded border-gray-200 hover:bg-gray-100"
                                                            >
                                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                                    <div className="flex items-center">
                                                                        <span className="font-medium">
                                                                            {state?.turf?.name}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-6 text-left">
                                                                    <div className="flex font-medium items-center">
                                                                        <div className="mr-2"></div>
                                                                        <span>{state?.sport}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-6 text-center">
                                                                    <div className="flex items-center justify-center">
                                                                        {new Date(state?.bookDate).toDateString()}
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-6 text-center">
                                                                    <div className="font-medium items-center">
                                                                        {state?.time?.map((res) => {
                                                                            return (
                                                                                <span key={res._id}>
                                                                                    <div className="flex flex-col">
                                                                                        {res?.slots}
                                                                                    </div>
                                                                                </span>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </td>
                                                                <td className=" text-center">
                                                                    <div
                                                                        onClick={() => handleSelectView(state._id)}
                                                                        className="flex item-center justify-center"
                                                                    >
                                                                        <AiFillFolderOpen size={23} />
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-6 text-center">
                                                                    {state?.bookingStatus ? (
                                                                        <div
                                                                            onClick={() => handleCancel({ id: state._id })}
                                                                            className=" font-medium px-3 py-2 bg-red-500 items-center"
                                                                        >
                                                                            <span className="">Cancel</span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className=" font-medium items-center">
                                                                            <div className="mr-2"></div>
                                                                            <span>{state?.status}</span>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            </tr>
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
                </div>
            </div>
        </div>
    );
}

export default BookingList;
