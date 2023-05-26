import React, { useEffect, useState } from "react";
import { FetchAllBookingsReqApi } from "../../../API/Services/AdminRequest";
import { useSelector } from "react-redux";
import TableComponent from "./Components/TableComponent";
import ListCard from "./Components/ListCard";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import Pagination from "./Components/Pagination";

function BookingComponent() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.adminLogin.token);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [event, setEvent] = useState([]);
    const [loader, setLoader] = useState(false);

    const fullData = async () => {
        setLoader(true);
        const response = await FetchAllBookingsReqApi(token);
        if (response.status === 201) {
            setData(response.data.result);
            setEvent(response.data.event);
            setLoader(false);
        }
    };

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

    const handleView = (id) => {
        console.log(id);
        navigate("/admin/offer-view/" + id);
    };

    useEffect(() => {
        if (token) {
            fullData();
        }
    }, [token]);

    return (
        <div>
            <div className="px-10 pb-20 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-slate-700">
                <div>
                    {event?.length > 0 ? (
                        <>
                            <h1 className="w-full mx-4 my-3 font-normal text-2xl font-heading uppercase mb-10">
                                Offer Bookings
                            </h1>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    {event?.map((res) => {
                        return (
                            <div key={res.client._id} onClick={() => handleView(res.client._id)}>
                                <ListCard event={res} />
                            </div>
                        );
                    })}
                </div>
                <div className="">
                    {loader && <Loader />}
                    {data?.length > 0 ? (
                        <h1 className="w-full mx-4 my-3 font-normal text-2xl font-heading uppercase">Bookings</h1>
                    ) : (
                        <></>
                    )}
                </div>

                {records?.map((res) => {
                    return (
                        <span key={res._id}>
                            <div className="bg-gray-100 rounded w-full lg:max-w-full lg:flex m-3 ">
                                <div
                                    className="h-48 p-2 lg:h-auto lg:w-48 flex-none bg-cover text-center overflow-hidden"
                                    title="Mountain"
                                >
                                    <img src={res?.turf?.images[0]} alt="" />
                                </div>
                                <div className=" p-4 flex justify-between leading-normal">
                                    <TableComponent data={res} />
                                </div>
                            </div>
                        </span>
                    );
                })}
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
