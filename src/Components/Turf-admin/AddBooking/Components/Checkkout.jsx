import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SubmitBookingAdminReqApi } from "../../../../API/Services/TurfAdminRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Layout/Loader";

function CheckOutComponent({ bookingData, setBookingData, movingDiv, handleOnchange }) {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const handlePayment = async () => {
        setLoader(true);
        const response = await SubmitBookingAdminReqApi(bookingData, token);

        if (response.status === 201) {
            toast.success("Booking Success");
            setLoader(false);
            navigate("/turf-admin/booking");
        }
    };
    return (
        <div ref={movingDiv} className="px-3 md:w-5/12">
            {/* <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-3 items-center">
                    {loader && <Loader />}
                    <div className="w-32">
                        <span className="text-gray-600 font-semibold">Contact</span>
                    </div>
                    <div className="flex-grow pl-3">
                        <span>Scott Windon</span>
                    </div>
                </div>
                <div className="w-full flex items-center">
                    <div className="w-32">
                        <span className="text-gray-600 font-semibold">Billing Address</span>
                    </div>
                    <div className="flex-grow pl-3">
                        <span>123 George Street, Sydney, NSW 2000 Australia</span>
                    </div>
                </div>
            </div> */}
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                <div className="w-full p-3 border-b border-gray-200">
                    <div className="mb-5 font-bold text-sm uppercase">Over view</div>
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="name"
                                id="floating_email"
                                onChange={handleOnchange}
                                value={bookingData.name}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                for="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Name
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="phone"
                                id="floating_email"
                                onChange={handleOnchange}
                                value={bookingData.phone}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                for="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Phone
                            </label>
                        </div>

                        <div className="mb-3">
                            <div className="w-full flex mb-3 items-center">
                                <div className="w-32">
                                    <span className="text-gray-600 font-semibold">Date</span>
                                </div>
                                <div className="flex-grow pl-3">
                                    <span>{new Date(bookingData?.date).toDateString()}</span>
                                </div>
                            </div>
                            <div className="w-full flex items-center">
                                <div className="w-32">
                                    <span className="text-gray-600 font-semibold">Time</span>
                                </div>
                                <div className="flex-grow pl-3">
                                    <span>
                                        {bookingData?.time?.map((res) => {
                                            return <div key={res._id}>{res.slots}</div>;
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="w-full flex mb-3 mt-3 items-center">
                                <div className="w-32">
                                    <span className="text-gray-600 font-semibold">Sport</span>
                                </div>
                                <div className="flex-grow pl-3">
                                    <span>{bookingData?.sport}</span>
                                </div>
                            </div>
                            <div className="w-full flex items-center">
                                <div className="w-32">
                                    <span className="text-gray-600 font-semibold">Total</span>
                                </div>
                                <div className="flex-grow pl-3">
                                    <span>{bookingData.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button
                    onClick={() => handlePayment()}
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"
                >
                    PAY NOW
                </button>
            </div>
        </div>
    );
}

export default CheckOutComponent;
