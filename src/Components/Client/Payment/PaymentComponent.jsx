import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { BookingSubmitReqApi } from "../../../API/Services/ClientRequest";
import { useSelector } from "react-redux";
import { message } from "antd";
import SuccessModal from "./SuccessModal";

function PaymentComponent() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const token = useSelector((state) => state.userLogin.token);
    const initialOptions = {
        "client-id": process.env.REACT_APP_CLIENT_ID,
    };
    const location = useLocation();

    const [bookingData, setBoookingData] = useState([]);
    const [time, setTime] = useState([]);
    const [date, setDate] = useState({});
    const [total, setTotal] = useState([]);
    const [advance, setAdvance] = useState([]);

    useEffect(() => {
        if (location.state) {
            console.log(location.state, "location.state");
            setBoookingData([location.state]);
            setTime([location.state.time]);
            setDate(location.state.date);
            setTotal([location.state.total]);
            setAdvance([location.state.advance]);
        } else {
            console.log(11);
        }
    }, [""]);
    const bookinDate = new Date(date ? date : "").toDateString();
    const handlePayment = async (id) => {
        const response = await BookingSubmitReqApi(
            {
                time: time,
                date: date,
                advance: advance,
                total: total,
                bookingData,
                bookingId: id,
            },
            token
        );
        if (response.status === 201) {
            setModal(true);
        }
    };
    return (
        <div>
            {modal && <SuccessModal setModal={setModal} />}

            <PayPalScriptProvider options={initialOptions}>
                <div className="flex justify-center items-center ">
                    <div className="w-full max-w-sm bg-gray-200 m-5 rounded-xl bg-layer-2 px-8 py-6">
                        <h3 className="text-lg font-semibold text-heading">Booking Details</h3>

                        <dl className="mt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm font-semibold text-text">You Booked</dt>
                                <dd className="text-lg font-semibold text-heading">
                                    {time.length > 0 ? time[0].length : ""} slots
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm font-semibold text-text">Date</dt>
                                <dd className="text-sm font-semibold text-heading">{bookinDate}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm font-semibold text-text">Total amount</dt>
                                <dd className="text-sm font-semibold text-heading">{total ? total : ""}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm font-semibold text-text">Advance for booking</dt>
                                <dd className="text-sm font-semibold text-heading">{advance ? advance : ""}</dd>
                            </div>
                        </dl>

                        <div className="mt-6 flex flex-col space-y-2">
                            {/* <button
                                type="button"
                                onClick={handlePayment}
                                className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-primary bg-green-300 px-4 py-2.5 text-sm font-semibold text-dark shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80"
                            >
                                Paypal
                            </button> */}
                            {advance.length > 0 && advance ? (
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order
                                            .create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: advance[0],
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
                            ) : (
                                <button
                                    type="button"
                                    className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-primary bg-green-300 px-4 py-2.5 text-sm font-semibold text-dark shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80"
                                >
                                    Paypal
                                </button>
                            )}
                            <button
                                type="button"
                                className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-critical bg-red-300 px-4 py-2.5 text-sm font-semibold text-dark shadow-sm hover:border-critical-accent hover:bg-critical-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-critical disabled:hover:bg-critical disabled:hover:text-white dark:focus:ring-white/80"
                            >
                                Cancel this Booking
                            </button>
                        </div>
                    </div>
                </div>
            </PayPalScriptProvider>
        </div>
    );
}

export default PaymentComponent;
