import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EventBookingDetailsReqApi } from "../../../../../API/Services/ClientRequest";
import ListCard from "./ListCard";
import Loader from "../../../../Turf-admin/Layout/Loader";

function EventBookedComponent() {
    const id = useSelector((state) => state.userLogin.id);
    const navigate = useNavigate();
    const token = useSelector((state) => state.userLogin.token);
    const [loader, setLoader] = useState(false);
    const [bookings, setBookings] = useState([]);

    const data = async () => {
        setLoader(true);
        const response = await EventBookingDetailsReqApi(token);
        if (response.status === 201) {
            setBookings(response.data.result);
            setLoader(false);
        }
    };

    useEffect(() => {
        token && data();
    }, [token]);

    return (
        <div>
            <div className="text-lime-600 font-semibold text-2xl mb-5">My Events</div>
            <div>
                {loader && <Loader />}
                <div className="">
                    <div className="overflow-x-auto">
                        <div className="min-w-screen  rounded ps-5 justify-center  font-sans overflow-hidden">
                            <div className="w-full pt-16">
                                {bookings.length > 0 ? (
                                    <div className="p-10 grid grid-cols-2">
                                        {bookings.map((res) => {
                                            return (
                                                <div key={res._id}>
                                                    <ListCard booking={res} />
                                                </div>
                                            );
                                        })}
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

export default EventBookedComponent;
