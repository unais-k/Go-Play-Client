import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BookingListReqApi, BookingStatusSetReqApi, PaymentStatusSetReqApi } from "../../../API/Services/TurfAdminRequest";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import Pagination from "../../Admin/Booking/Components/Pagination";

function BookingComponent() {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    const bookingListData = useCallback(async () => {
        setLoader(true);
        const response = await BookingListReqApi(token);
        if (response.data.result) {
            setData(response.data.result);
            setLoader(false);
        }
    }, [token]);

    const handlePayment = async (id) => {
        if (id.value === "Pending") {
            return false;
        } else {
            const change = async () => {
                const response = await PaymentStatusSetReqApi(id, token);
                if (response.status === 201) setData(response.data.result);
            };
            change();
        }
    };

    // pagination
    const perPage = 3;
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    let records;
    let nPage;
    let numbers;
    if (data.length > 0) {
        records = data.slice(firstIndex, lastIndex);
        nPage = Math.ceil(data.length / perPage);
        numbers = [...Array(nPage + 1).keys()].slice(1);
    }

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function changeCPage(id) {
        setCurrentPage(id);
    }
    function nextPage() {
        if (currentPage !== nPage) {
            setCurrentPage(currentPage + 1);
        }
    }
    // pagination end here

    const handleBooking = async (id) => {
        if (id.value === "Pending") {
            return false;
        } else {
            const change = async () => {
                const response = await BookingStatusSetReqApi(id, token);
                if (response.status === 201) setData(response.data.result);
            };
            change();
        }
    };

    const handleBook = async () => {
        navigate("/turf-admin/add-booking");
    };

    useEffect(() => {
        if (token) {
            bookingListData();
        }
    }, [token, bookingListData]);

    return (
        <div className="">
            <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-slate-700">
                {loader && <Loader />}
                <div className="mt-16" onClick={handleBook}>
                    <button className="mx-3 mt-5 px-3 py-2 text-dark bg-amber-500 rounded text-sm font-bold uppercase">
                        Add Booking
                    </button>
                </div>

                {data?.length > 0 ? (
                    data?.map((res) => {
                        return (
                            <div key={res._id} className="bg-gray-100 rounded w-fit lg:max-w-full lg:flex m-3">
                                <div className=" p-4 flex justify-between leading-normal">
                                    <div className="">
                                        <div className="text-gray-900 font-bold text-xl mb-2">{res?.turf?.name}</div>
                                        <div className="text-gray-900 font-normal text-md mb-2">
                                            {res?.event?.groundName}
                                        </div>
                                        <table className="min-w-max w-full table-auto">
                                            <thead>
                                                <tr className="text-gray-600 uppercase text-sm leading-normal">
                                                    <th className="py-3 px-6 text-left">Name</th>
                                                    <th className="py-3 px-6 text-center">Time</th>
                                                    <th className="py-3 px-6 text-center">Date</th>
                                                    <th className="py-3 px-6 text-center">Sport</th>
                                                    <th className="py-3 px-6 text-center">total</th>
                                                    <th className="py-3 px-6 text-center">Average</th>
                                                    <th className="py-3 px-6 text-center">Booking Model</th>
                                                    <th className="py-3 px-6 text-center">Payment status</th>
                                                    <th className="py-3 px-6 text-center">Booking status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-sm font-light">
                                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                                    <td className="py-3 px-6 text-left">
                                                        <div className="flex items-center">
                                                            <div className=" text-center">
                                                                <span className="font-medium ">
                                                                    {res?.client?.name || res?.name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center font-semibold">
                                                        <div className="text-center">
                                                            {res.time.map((response) => {
                                                                return (
                                                                    <div key={response._id} className="flex">
                                                                        {response?.slots}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center font-semibold">
                                                        <div className="items-center justify-center">
                                                            {new Date(res.bookDate).toDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center font-semibold">
                                                        <div className="items-center justify-center">{res?.sport}</div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="text-center">
                                                            <span className="font-medium text-lg">{res?.total}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="text-center">
                                                            <span className="font-medium text-lg">{res?.advance}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="text-center">
                                                            <span className="font-medium text-md">{res?.bookingType}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className=" text-center">
                                                            {res?.payment ? (
                                                                <span className="font-medium ">{res?.payment}</span>
                                                            ) : (
                                                                <select
                                                                    onClick={(e) =>
                                                                        handlePayment({
                                                                            id: res?._id,
                                                                            value: e.target.value,
                                                                        })
                                                                    }
                                                                    className="rounded border-0"
                                                                    data-te-select-init
                                                                    data-te-select-visible-options="3"
                                                                >
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="Confirm">Confirm</option>
                                                                    <option value="Cancelled">Cancelled</option>
                                                                </select>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className=" text-center">
                                                            {res?.status ? (
                                                                <span className="font-medium ">{res?.status}</span>
                                                            ) : (
                                                                <select
                                                                    onClick={(e) =>
                                                                        handleBooking({
                                                                            id: res?._id,
                                                                            value: e.target.value,
                                                                        })
                                                                    }
                                                                    className="rounded border-0"
                                                                    data-te-select-init
                                                                    data-te-select-visible-options="3"
                                                                >
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="Completed">Completed</option>
                                                                    <option value="Cancelled">Cancelled</option>
                                                                </select>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>
                        <section className="flex items-center h-full sm:p-16 dark:bg-gray-900 dark:text-gray-100">
                            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-40 h-40 dark:text-gray-600"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
                                    ></path>
                                    <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                                    <polygon
                                        fill="currentColor"
                                        points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
                                    ></polygon>
                                    <polygon
                                        fill="currentColor"
                                        points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
                                    ></polygon>
                                </svg>
                                <p className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-3xl font-bold uppercase">
                                    Looks like no one ordered yet
                                </p>
                            </div>
                        </section>
                    </div>
                )}
                {data.length > 3 ? (
                    <Pagination
                        nextPage={nextPage}
                        changeCPage={changeCPage}
                        numbers={numbers}
                        currentPage={currentPage}
                        prePage={prePage}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default BookingComponent;
