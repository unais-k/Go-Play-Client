import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CheckOutComponent from "./Checkkout";
import {
    EventFetchOnSelectReqApi,
    GroundFetchOnSelectReqApi,
    GroundViewReqApi,
    OnDateBookedReqApi,
    SelectTypeOfReqApi,
} from "../../../../API/Services/TurfAdminRequest";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimeComponent from "./TimeComponent";
import { toast } from "react-toastify";

function AddBookingViewComponent() {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const param = useParams();
    const id = param.id;

    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(true);
    const [step3, setStep3] = useState(true);
    const [step4, setStep4] = useState(true);

    const [showDiv, setShowDiv] = useState(false);
    const [showDiv1, setShowDiv1] = useState(false);
    const [showDiv2, setShowDiv2] = useState(false);
    const [showDiv3, setShowDiv3] = useState(false);
    const [showDiv4, setShowDiv4] = useState(false);

    const movingDiv = useRef(null);

    const [state, setState] = useState([]);
    const [sport, setSport] = useState([]);
    const [selectedSport, setSelectedSport] = useState("");
    const [time, setTime] = useState([]);
    const [selectSlot, setSelectSlot] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [eventOnTime, setEventOnTime] = useState([]);
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [ground, setGround] = useState([]);
    const [bookingData, setBookingData] = useState({
        name: "",
        date: "",
        eventId: "",
        groundId: "",
        phone: "",
        price: "",
        time: "",
        sport: "",
    });

    const GroundData = async () => {
        const response = await GroundViewReqApi(id, token);
        if (response.status === 201) {
            setState(response.data.result);
        } else {
            toast.error("Something went wrong");
        }
    };

    const handleOnchange = async (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value,
        });
    };

    // grounds sports types
    const GroundEventAvailable = async () => {
        const response = await SelectTypeOfReqApi(id, token);
        setSport(response.data.result);
    };
    useEffect(() => {
        if (token) {
            GroundEventAvailable();
            GroundData();
        }
    }, [token]);

    // selecting sport
    const handleSelectedSport = async (id) => {
        setSelectedSport(id.value);

        const response = await GroundFetchOnSelectReqApi(id, token);
        if (response.status === 201) {
            setGround(response.data.result);
            setSelectedEvent(response.data.result);
            setShowDiv(true);
            setShowDiv1(false);
            setShowDiv2(false);
            setShowDiv3(false);
            setShowDiv4(false);
        }
    };

    // selecting event
    const handleSelectGround = async (id) => {
        setShowDiv1(true);

        const response = await EventFetchOnSelectReqApi(id, token);
        setTime(response.data.slots);
        setEventOnTime(response.data.result);
    };

    // Date
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);

    const bookedFetchOnDate = async (date) => {
        const response = await OnDateBookedReqApi({ id: selectedEvent[0]._id, date: date }, token);

        let time2 = time.map((val) => {
            if (response.data.time[0]) {
                for (let i = 0; i < response.data.time.length; i++) {
                    if (val.booked) {
                        val["booked"] = false;
                    }
                    if (val._id == response.data.time[i].timeId) {
                        val["booked"] = true;
                        break;
                    }
                }
            } else {
                val["booked"] = false;
            }
            return val;
        });
        setTime(time2);
    };

    const handleDateChange = async (date) => {
        setDate(date);
        await bookedFetchOnDate(date);
    };

    const bookNow3 = async (date) => {
        setTime(
            time.map((val) => {
                if (val.onBooking) {
                    val["onBooking"] = false;
                }
                return val;
            })
        );
        setPrice(0);
        setSelectSlot([]);
        setShowDiv2(true);
    };

    // selecting time slots
    const handleBooking = async (id) => {
        const compare = await selectSlot.find((res) => JSON.stringify(res) === JSON.stringify(id));

        if (!compare) {
            setTime(
                time.map((val) => {
                    if (val._id == id.timeId) {
                        val["onBooking"] = true;
                    }
                    return val;
                })
            );
            setSelectSlot([...selectSlot, id]);
            setPrice(+price + +id.price);
        } else {
            setTime(
                time.map((val) => {
                    if (val._id == id.timeId) {
                        val["onBooking"] = false;
                    }
                    return val;
                })
            );
            setSelectSlot(selectSlot.filter((val) => val.timeId !== id.timeId));
            setPrice(price - id.price);
        }
        setShowDiv3(true);
    };

    // submit
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setShowDiv4(true);
        movingDiv?.current?.scrollIntoView({ behavior: "smooth" });
        setBookingData({
            date: date,
            price: price,
            eventId: eventOnTime._id,
            groundId: id,
            time: selectSlot,
            sport: selectedSport,
        });

        bookNow3();
        setPrice(0);
        setSelectSlot([]);
        setStep1(null);
        setStep2(null);
        setShowDiv3(false);
        setShowDiv1(false);
        setShowDiv2(false);
    };

    return (
        <div className="overflow-y-auto h-screen">
            <div className="min-w-screen min-h-screen">
                <div className="w-11/12 m-auto bg- pt-20 border-t p-5 text-gray-800">
                    <div className="w-full">
                        <div className="-mx-3 md:flex items-start">
                            <div className="px-3 md:w-7/12 lg:pr-10">
                                <div className="grid grid-cols-2 space-x-8">
                                    <div className="w-full mx-auto text-gray-800 font-light mb-4 border-b border-gray-200 pb-4">
                                        <div className="uppercase font-bold text-sm text-lime-500">Select a sport</div>
                                        <div className="w-full flex items-center">
                                            {sport.length > 0 &&
                                                sport?.map((res) => {
                                                    return (
                                                        <div
                                                            className={`${
                                                                step1 === res ? "bg-amber-500" : "bg-gray-200"
                                                            } px-4 py-2 m-2 font-normal`}
                                                            key={Math.floor(Math.random) * 0.2351 + 124}
                                                            onClick={(e) => {
                                                                setStep1(res);
                                                                handleSelectedSport({
                                                                    value: res,
                                                                    groundId: state._id,
                                                                    e: e,
                                                                });
                                                            }}
                                                        >
                                                            {res}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                    {showDiv && (
                                        <div className="mb-4 pb-4 border-b border-gray-200">
                                            <div>
                                                <div className="uppercase font-bold text-sm text-lime-500">
                                                    Select Ground
                                                </div>
                                                <div className="flex">
                                                    {ground?.map((res) => {
                                                        return (
                                                            <div
                                                                key={res._id}
                                                                className={`flex flex-col w-fit m-3 p-5 ${
                                                                    step2 === res._id ? "bg-amber-500" : "bg-gray-200"
                                                                } `}
                                                                onClick={() => {
                                                                    setStep2(res._id);
                                                                    handleSelectGround(res._id);
                                                                }}
                                                            >
                                                                <div className="">{res.groundName}</div>
                                                                <div>-{res.type}</div>
                                                                <div>-{res.size}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {showDiv1 && (
                                    <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                        <div>
                                            <div className="text-lime-600 mb-5 text-2xl font-bold">Select Date</div>
                                            <div className="w-96">
                                                <Calendar
                                                    minDate={new Date()}
                                                    maxDate={maxDate}
                                                    selected={date}
                                                    onChange={handleDateChange}
                                                    onClickDay={bookNow3}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showDiv2 && (
                                    <div>
                                        <div className="uppercase font-bold text-sm text-lime-500">Select Time</div>
                                        <div>
                                            selected Date
                                            <br />
                                            <span className="text-red-500 font-semibold">
                                                {new Date(date).toDateString()}
                                            </span>
                                        </div>
                                        <div></div>
                                        <div className="flex flex-wrap mt-5 mb-10 w-full">
                                            {time?.length > 0 &&
                                                time?.map((res, index) => {
                                                    return (
                                                        <div key={res._id}>
                                                            <TimeComponent
                                                                selectedSport={selectedSport}
                                                                eventOnTime={eventOnTime}
                                                                handleBooking={handleBooking}
                                                                time={res}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                )}
                                {showDiv3 && (
                                    <div className="flex justify-center">
                                        <div className="fixed flex justify-between bg-green-400 w-3/5 bottom-5">
                                            <p></p>
                                            <p className="p-3">Date: {new Date(date).toDateString()}</p>
                                            <p className="p-3">Total Slot booked: {selectSlot ? selectSlot.length : ""}</p>
                                            <p className="p-3">Total price: {price ? price : ""}</p>
                                            <p className="p-3">Total price: {price ? price : ""}</p>
                                            <p className=" bg-orange-400 m-1 p-2 rounded" onClick={handleBookingSubmit}>
                                                Book Now
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {showDiv4 && (
                                <CheckOutComponent
                                    handleOnchange={handleOnchange}
                                    bookingData={bookingData}
                                    movingDiv={movingDiv}
                                    setBookingData={setBookingData}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBookingViewComponent;
