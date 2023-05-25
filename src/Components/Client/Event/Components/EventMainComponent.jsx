import React, { useEffect, useRef, useState } from "react";
import { Text } from "./text";
import { useSelector } from "react-redux";
import {
    EventDateCheckReqApi,
    EventFetchOnSelectReqApi,
    GroundFetchOnSelectReqApi,
    GroundViewReqApi,
    OnDateBookedReqApi,
    SelectTypeOfReqApi,
} from "../../../../API/Services/ClientRequest";
import { message } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import RightSideComponent from "./RightSideComponent";
import EventCardComponent from "./EventCardComponent";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import SuccessModal from "./SucessModal";
import TimeComponent from "./TimeComponent";
import Loader from "../../../Turf-admin/Layout/Loader";

function EventMainComponent({ state }) {
    const navigate = useNavigate();

    const token = useSelector((state) => state.userLogin.token);

    const [groundData, setGroundData] = useState([]);
    const [event, setEvent] = useState([]);
    const [sport, setSport] = useState([]);
    const [loader, setLoader] = useState(false);
    const [time, setTime] = useState([]);
    const [states, setStates] = useState(null);
    const [selectedType, setSelectedType] = useState("");

    const [selectSlot, setSelectSlot] = useState([]);
    const [ground, setGround] = useState([]);
    const [bookedData, setBookedData] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [bookedTime, setBookedTime] = useState([]);
    const [price, setPrice] = useState(0);
    const [modalO, setModalO] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [eventOnTime, setEventOnTime] = useState([]);
    const [date, setDate] = useState(new Date(Date.now()));
    const [selectedSport, setSelectedSport] = useState("");

    const [showDiv1, setShowDiv1] = useState(false);
    const [showDiv2, setShowDiv2] = useState(false);
    const [showDiv3, setShowDiv3] = useState(false);
    const [showDiv4, setShowDiv4] = useState(false);

    const movingDiv1 = useRef(null);
    const movingDiv2 = useRef(null);
    const movingDiv3 = useRef(null);
    const movingDiv4 = useRef(null);

    const GroundData = async () => {
        setLoader(true);
        const response = await GroundViewReqApi(state?.groundDetail?._id);
        if (response.status === 200) {
            setEvent(response.data.events);
            setLoader(false);
        } else {
            message.error("Something went wrong");
        }
    };
    // choosing sport type
    const bookNow1 = () => {
        setShowDiv1(true);
        movingDiv1?.current?.scrollIntoView({ behavior: "smooth" });
        setShowDiv2(false);
        setShowDiv3(false);
        setPrice(0);
        setDate(new Date());
        setSelectSlot([]);
    };

    const handleSelectedSport = async (id) => {
        if (selectedType) {
            setSelectedSport(id.value);
            const response = await GroundFetchOnSelectReqApi(id);
            if (response.status === 201) {
                setGround(response.data.result);
                setSelectedEvent(response.data.result);
                bookNow1();
            }
        } else {
            message.warning("Select a type of Package");
        }
    };

    // choosing event
    const bookNow2 = () => {
        setShowDiv2(true);
        movingDiv2?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSelectGround = async (id) => {
        const response = await EventFetchOnSelectReqApi(id);
        setTime(response.data.slots);
        setEventOnTime(response.data.result[0]);
        bookNow2();
    };

    // selecting date
    const bookNow3 = async (date) => {
        setShowDiv3(true);
        setShowDiv2(true);
        setTime(
            time.map((val) => {
                if (val.onBooking) {
                    val["onBooking"] = false;
                }
                return val;
            })
        );
        movingDiv3?.current?.scrollIntoView({ behavior: "smooth" });

        setPrice(0);
        setSelectSlot([]);
    };

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 10);

    // fetching time slots

    const bookedFetchOnDate = async (date) => {
        const response = await OnDateBookedReqApi({ id: selectedEvent[0]._id, date: date });
        setBookedData(response.data.result);
        console.log(response.data);

        let time2 = time.map((val) => {
            if (response.data.time) {
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

        setBookedTime(response.data.time);
    };

    console.log(time, "tim");

    const handleDateChange = async (date) => {
        setDate(date);
        await bookedFetchOnDate(date);
    };

    const bookNow4 = () => {
        setShowDiv4(true);
        movingDiv3?.current?.scrollIntoView({ behavior: "smooth" });
    };

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
            setSelectSlot(selectSlot.filter((val) => val.time != id.time));
            setPrice(-price - -id.price);
        }
        bookNow4();
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (token && time.length > 0) {
            setBookingData({
                date: date,
                eventId: eventOnTime._id,
                offer: selectedType,
                groundId: state.groundDetail._id,
                time: selectSlot,
                price: price,
                advance: price / 15,
                sport: selectedSport,
            });

            const eventDateCheck = async () => {
                const response = await EventDateCheckReqApi(
                    { date: date, eventId: eventOnTime._id, event: selectedType, time: selectSlot },
                    token
                );
                if (response.data.result) {
                    const details = response.data.result;
                    const res = response.data.result;
                    if (res.length == 0) {
                        setModal1(true);
                        bookNow1();
                        bookNow2();
                        bookNow3();
                        bookNow4();
                        setPrice(0);
                        setShowDiv4(false);
                        setSelectSlot([]);
                    } else {
                        setModalO(true);
                        setPrice(0);
                        bookNow3();
                        bookNow4();
                        setSelectSlot([]);
                        setShowDiv4(false);
                    }
                }
            };
            eventDateCheck();
        } else {
            message.warning("Login first");
            navigate("/login");
        }
    };

    useEffect(() => {
        if (state) {
            setGroundData(state);
            GroundData();
        }
    }, [state]);

    useEffect(() => {
        if (state) {
            SelectTypeOfReqApi(state.groundDetail._id).then((res) => {
                setSport(res.data.result);
                // bookNow();
            });
        } else {
            console.log("use");
        }
    }, [state._id]);

    const cardTitle = [
        {
            id: 1,
            title: "Week",
            description: "20% of normal booking cost will be reduced",
            status: false,
        },
        {
            id: 2,
            title: "Month",
            description: "30% of normal booking cost will be reduced",
            status: false,
        },
    ];

    return (
        <div className="px-10">
            <section className="relative z-10 p-10 overflow-hidden bg-white lg:py-[40px]">
                <div className="container mx-auto">
                    <div className="flex justify-center gap-10 mb-5">
                        {cardTitle.map((res) => {
                            return (
                                <div
                                    key={res.id}
                                    onClick={() => {
                                        setStates(res.id);
                                        setSelectedType(res.title);
                                    }}
                                >
                                    <EventCardComponent states={states} cardTitle={res} />
                                </div>
                            );
                        })}
                    </div>
                    {loader && <Loader />}
                    {modalO && <Modal setModalO={setModalO} />}
                    {modal1 && <SuccessModal selectedType={selectedType} bookingData={bookingData} setModal1={setModal1} />}
                    <div className="-mx-4 flex flex-wrap lg:justify-between">
                        <RightSideComponent state={state} />
                        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                            <div className="relative rounded-lg bg-white p-8 shadow-lg sm:p-12">
                                <div>
                                    <div className="text-dark mt-5 text-xl font-bold uppercase">Choose Sport Type</div>
                                    <div className="flex">
                                        {sport ? (
                                            sport?.map((res) => {
                                                return (
                                                    <div
                                                        className="bg-gray-200 px-4 py-2 m-2 mb-10"
                                                        key={Math.floor(Math.random) * 0.2351 + 124}
                                                        onClick={(e) =>
                                                            handleSelectedSport({
                                                                value: res,
                                                                groundId: state.groundDetail._id,
                                                                e: e,
                                                            })
                                                        }
                                                    >
                                                        {res}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div>No Event is available at the moment, Please look after some days</div>
                                        )}
                                    </div>
                                </div>
                                {showDiv1 && (
                                    <div ref={movingDiv1}>
                                        <div className="text-dark text-xl uppercase font-bold">Choose Ground</div>
                                        <div className="flex">
                                            {ground?.map((res) => {
                                                return (
                                                    <div
                                                        key={res._id}
                                                        className="flex flex-col w-36 h-36 items-center bg-gray-200 m-3 p-5"
                                                        onClick={() => handleSelectGround(res._id)}
                                                    >
                                                        <div className="mb-3 uppercase font-semibold">{res.groundName}</div>
                                                        <div>{res.type}</div>
                                                        <div>{res.size}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                <Text />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ms-20">
                    {showDiv2 && (
                        <div ref={movingDiv2}>
                            <div className="text-dark text-xl uppercase font-bold mb-3">Choose a date</div>
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
                    )}
                    {showDiv3 && (
                        <div ref={movingDiv3} className="mt-16">
                            <div className="text-dark text-xl uppercase font-bold">Select a Time</div>
                            <div>
                                selected Date
                                <br />
                                <span className="text-red-500 font-semibold">{new Date(date).toDateString()}</span>
                            </div>
                            <div></div>
                            <div className="flex flex-wrap mt-5 mb-10 w-6/12">
                                {time?.length > 0 &&
                                    time?.map((res, index) => {
                                        return (
                                            <TimeComponent
                                                key={res._id}
                                                handleBooking={handleBooking}
                                                time={res}
                                                eventOnTime={eventOnTime}
                                                selectedSport={selectedSport}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {showDiv4 && (
                        <div ref={movingDiv4} className="flex justify-center">
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
            </section>
        </div>
    );
}

export default EventMainComponent;
