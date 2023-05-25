import React, { useEffect, useState } from "react";
import { AnotherCircle } from "../Event/Components/text";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { EventSubmitReqApi } from "../../../API/Services/ClientRequest";
import { toast } from "react-toastify";

function PaymentComponent() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.userLogin.token);
    const location = useLocation();
    const [bookingData, setBookingData] = useState([]);
    const [time, setTime] = useState([]);
    const [date, setDate] = useState(new Date(Date.now()));
    const [selectedType, setSelectedType] = useState("");
    const [total, setTotal] = useState(null);
    const [advance, setAdvance] = useState(null);
    const initialOptions = {
        "client-id": process.env.REACT_APP_CLIENT_ID,
    };

    useEffect(() => {
        if (location.state) {
            setBookingData([location.state]);
            setTime(location.state.time);
            setDate(location.state.date);
            setTotal(location.state.total);
            setSelectedType(location.state.offer);
            setAdvance(location.state.advance);
        }
    }, [location.state]);

    const handlePayment = async (id) => {
        const response = await EventSubmitReqApi(
            {
                time: time,
                date: date,
                offer: selectedType,
                advance: advance,
                total: total,
                bookingData,
                bookingId: id,
            },
            token
        );
        if (response.status === 201) {
            navigate("/event-booking");
            toast.success("Booking success");
        }
    };
    console.log(location.state);
    return (
        <div className="flex justify-center items-center mt-20">
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <PayPalScriptProvider options={initialOptions}>
                    <div className="relative z-10 mb-10 overflow-hidden rounded-xl border border-primary border-opacity-20 bg-white py-10 px-8 shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-12">
                        <span className="mb-4 block text-lg font-semibold text-primary">Over view</span>
                        {selectedType === "Week" ? (
                            <>
                                <h2 className=" text-[42px] font-bold text-dark">
                                    {Math.round(advance)}
                                    <span className="text-base font-medium text-body-color">/ day</span>
                                </h2>
                                <span className="text-sm font-slim">Advance</span>
                                <p className="mb-8 mt-5 border-b border-[#F2F2F2] pb-8 text-base text-body-color">
                                    Offer that beyond your imagination
                                </p>
                                <div className="mb-7">
                                    <p className="mb-1 text-base leading-loose text-body-color">
                                        Time:{" "}
                                        {time?.map((res) => {
                                            return <span key={res._id}>{res?.slots}</span>;
                                        })}
                                    </p>
                                    <p className="mb-1 text-base leading-loose text-body-color">
                                        Starting Date: {new Date(date ? date : "").toDateString()}
                                    </p>
                                    <p className="mb-1 text-base leading-loose text-body-color">
                                        Ending Date:{" "}
                                        {new Date(
                                            date ? new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000) : ""
                                        ).toDateString()}
                                    </p>
                                    <p className="mb-1 text-base leading-loose text-body-color">Total Amount: {total}</p>
                                    <p className="mb-1 text-base leading-loose text-body-color">
                                        Sport : {bookingData[0]?.sport}
                                    </p>
                                    {/* <p className="mb-1 text-base leading-loose text-body-color">3 Months support</p> */}
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className=" text-[42px] font-bold text-dark">
                                    {Math.round(advance)}
                                    <span className="text-base font-medium text-body-color">/ day</span>
                                </h2>
                                <span className="my-5 text-sm font-extralight">Advance</span>
                                <p className="mb-8 mt-5 border-b border-[#F2F2F2] pb-8 text-base text-body-color">
                                    Offer that beyond your imagination
                                </p>
                                <div className="mb-7">
                                    <p className="mb-1 text-base leading-loose text-body-color">
                                        Time:{" "}
                                        {time?.map((res) => {
                                            return <span>{res?.slots}</span>;
                                        })}
                                    </p>
                                    <p className="mb-1 text-base leading-loose text-body-color">
                                        Starting Date: {new Date(date ? date : "").toDateString()}
                                    </p>
                                    <p className="mb-1 text-base leading-loose text-body-color">
                                        Ending Date:{" "}
                                        {new Date(
                                            date ? new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000) : ""
                                        ).toDateString()}
                                    </p>
                                    <p className="mb-1 text-base leading-loose text-body-color">Total Amount: {total}</p>
                                    <p className="mb-1 text-base leading-loose text-body-color">
                                        Sport : {bookingData[0]?.sport}
                                    </p>
                                </div>
                            </>
                        )}

                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order
                                    .create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: advance,
                                                },
                                            },
                                        ],
                                    })
                                    .then((orderId) => {
                                        console.log(orderId, "orderId");
                                        return orderId;
                                    });
                            }}
                            onApprove={async function (data, actions) {
                                return actions.order.capture().then(async function () {
                                    // Your code here after capture the order
                                    if (data.orderID) {
                                        console.log(data.orderID, "data.orderId");
                                        await handlePayment(data.orderID);
                                    } else {
                                    }
                                });
                            }}
                        />

                        <a
                            href="javascript:void(0)"
                            className="block w-full rounded-md border border-[#D4DEFF] bg-transparent p-4 text-center text-base font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                        >
                            Cancel
                        </a>

                        <div>
                            <span className="absolute right-0 top-7 z-[-1]">
                                <svg
                                    width="77"
                                    height="172"
                                    viewBox="0 0 77 172"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear"
                                            x1="86"
                                            y1="0"
                                            x2="86"
                                            y2="172"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stop-color="#3056D3" stop-opacity="0.09" />
                                            <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                            <AnotherCircle />
                        </div>
                    </div>
                </PayPalScriptProvider>
            </div>
        </div>
    );
}

export default PaymentComponent;
