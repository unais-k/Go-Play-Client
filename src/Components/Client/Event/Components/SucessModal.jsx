import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SuccessModal({ bookingData, selectedType, setModal1 }) {
    console.log(bookingData, "----------------------------------");
    const token = useSelector((state) => state.userLogin.token);
    const navigate = useNavigate();
    const [time, setTime] = useState([]);
    const [advance, setAdvance] = useState(null);
    const [date, setDate] = useState(new Date(Date.now()));
    const [price, setPrice] = useState(null);
    const [groundId, setGroundId] = useState(null);

    useEffect(() => {
        if (bookingData) {
            if (selectedType === "Week") {
                setPrice(bookingData?.price * 7);
                setAdvance(bookingData?.advance);
            }
            if (selectedType === "Month") {
                setPrice(bookingData?.price * 30);
                setAdvance(bookingData?.advance);
            }
            setTime(bookingData?.time);
            setDate(bookingData?.date);
            setGroundId(bookingData?.groundId);
        }
    }, [bookingData, time]);

    const handlePayment = () => {
        console.log("payment");
        if (token) {
            navigate("/event-payment", {
                state: {
                    time: time,
                    date: date,
                    offer: selectedType,
                    sport: bookingData?.sport,
                    groundId: groundId,
                    eventId: bookingData?.eventId,
                    total: price,
                    advance: Math.round(advance),
                },
            });
            setModal1(false);
        } else {
            toast.warning("Please Login");
            navigate("/login");
        }
    };
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Checkout</h3>
                            <button
                                className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setModal1(false)}
                            >
                                <FaWindowClose />
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className="relative p-6 flex-auto">
                                <table className="table-auto">
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
                                                    return <div>{res.slots}</div>;
                                                })}
                                            </td>
                                            <td className="px-4">1 {selectedType}</td>
                                            <td className="px-4">{bookingData.sport}</td>

                                            <td className="px-4">{price}</td>
                                            <td className="px-4">{Math.floor(price / 13)}</td>
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
                                    onClick={() => setModal1(false)}
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
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
