import React, { useEffect, useState } from "react";
import { GroundViewReqApi } from "../../../API/Services/ClientRequest";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function ModalBookingComponent({ bookingData, setShowModal }) {
    const token = useSelector((state) => state.userLogin.token);
    const navigate = useNavigate();
    //   const [showModal, setShowModal] = React.useState(false);
    const [time, setTime] = useState([]);
    const [date, setDate] = useState({});
    const [groundId, setGroundId] = useState({});
    const [groundData, setGroundData] = useState({});

    const GroundData = async () => {
        const response = await GroundViewReqApi(groundId);
        if (response.status === 200) {
            console.log(response, "response");
            setGroundData(response.data.result);
        }
    };

    useEffect(() => {
        if (bookingData) {
            setTime(bookingData.time);
            setDate(bookingData.date);
            setGroundId(bookingData.groundId);
            GroundData();
        }
    }, [bookingData, time]);

    const handlePayment = () => {
        console.log("payment");
        if (token) {
            navigate("/payment", {
                state: {
                    time: time,
                    date: date,
                    sport: bookingData.sport,
                    groundId: groundId,
                    eventId: bookingData.eventId,
                    total: bookingData.price,
                    advance: Math.round(bookingData.price / 11),
                },
            });
            setShowModal(false);
        } else {
            message.warning("Please Login");
            navigate("/login");
        }
    };

    return (
        <div>
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">Checkout</h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <table class="table-auto">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Date</th>
                                            <th>Sport Type</th>

                                            <th>Total</th>
                                            <th>Advance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-4">
                                                {time?.map((res) => {
                                                    return <div key={res._id}>{res.slots}</div>;
                                                })}
                                            </td>
                                            <td className="px-4">{new Date(date).toDateString()}</td>
                                            <td className="px-4">{bookingData.sport}</td>

                                            <td className="px-4">{bookingData.price}</td>
                                            <td className="px-4">{Math.floor(bookingData.price / 11)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="text-dark font-bold text-2xl mt-10">NB:</div>
                                <div className="m-5 text-red-400 font-semibold text-center">
                                    Once your payment is done, No refund
                                    <br />
                                    If You want to cancel booking, Dial ground directly
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => handlePayment()}
                                >
                                    Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        </div>
    );
}

export default ModalBookingComponent;
