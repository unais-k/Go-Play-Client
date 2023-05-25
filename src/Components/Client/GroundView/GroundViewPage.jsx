import React, { useEffect, useRef, useState } from "react";
import {
    EventFetchOnSelectReqApi,
    GroundFetchOnSelectReqApi,
    GroundViewReqApi,
    OnDateBookedReqApi,
    SelectTypeOfReqApi,
} from "../../../API/Services/ClientRequest";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import RulesComponent from "./RulesComponent";
import ReviewComponent from "./Review/ReviewComponent";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ModalBookingComponent from "./Modal";
import GroundDetailComponent from "./Components/GroundDetailComponent";
import { FiDelete } from "react-icons/fi";
import Loader from "./../../Turf-admin/Layout/Loader";

function GroundViewPage() {
    const navigate = useNavigate();

    const token = useSelector((state) => state.userLogin.token);
    const location = useLocation();
    const { id } = useParams();
    const [state, setState] = useState([]);
    const [sport, setSport] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedSport, setSelectedSport] = useState({});
    const [time, setTime] = useState([]);
    const [event, setEvent] = useState([]);
    const [selectSlot, setSelectSlot] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [eventOnTime, setEventOnTime] = useState([]);
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [loader, setLoader] = useState(false);
    const [bookedData, setBookedData] = useState([]);
    const [bookedTime, setBookedTime] = useState([]);
    const [review, setReview] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        date: "",
        eventId: "",
        groundId: "",
        price: "",
        time: "",
        sport: "",
    });

    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(true);
    const [step3, setStep3] = useState(true);
    const [step4, setStep4] = useState(true);

    const [showDiv, setShowDiv] = useState(true);
    const [showDiv1, setShowDiv1] = useState(false);
    const [showDiv2, setShowDiv2] = useState(false);
    const [showDiv3, setShowDiv3] = useState(false);
    const [showDiv4, setShowDiv4] = useState(false);
    const [ground, setGround] = useState([]);

    useEffect(() => {}, [time]);
    const movingDiv = useRef(null);
    const movingDiv1 = useRef(null);
    const movingDiv2 = useRef(null);
    const movingDiv3 = useRef(null);
    const movingDiv4 = useRef(null);
    const moveToReview = useRef(null);

    const reviewDiv = () => {
        moveToReview?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const bookNow = () => {
        setShowDiv(true);
        movingDiv?.current?.scrollIntoView({ behavior: "smooth" });
        setShowDiv1(false);
    };
    const bookNow1 = () => {
        setShowDiv1(true);
        movingDiv1?.current?.scrollIntoView({ behavior: "smooth" });
        setShowDiv2(false);
        setShowDiv3(false);
        setShowDiv4(false);
        setPrice(0);
        setDate(new Date());
        setSelectSlot([]);
    };

    const bookNow2 = () => {
        setShowDiv2(true);
        movingDiv2?.current?.scrollIntoView({ behavior: "smooth" });
    };
    const bookedFetchOnDate = async (date) => {
        const response = await OnDateBookedReqApi({ id: selectedEvent[0]._id, date: date });
        setBookedData(response.data.result);
        console.log(response.data.time);

        let time2 = time.map((val) => {
            if (response.data.time[0]) {
                console.log("enter ground");
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

    const handleDateChange = async (date) => {
        setDate(date);
        await bookedFetchOnDate(date);
    };

    const bookNow3 = async () => {
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
        setShowDiv4(false);
        setPrice(0);
        setSelectSlot([]);
    };
    const bookNow4 = () => {
        setShowDiv4(true);
        movingDiv3?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const GroundData = async () => {
        setLoader(true);
        const response = await GroundViewReqApi(id);

        if (response.status === 200) {
            setState(response.data.result);
            setEvent(response.data.events);
            setReview(response.data.review);

            setLoader(false);
        } else {
            message.error("Something went wrong");
        }
    };

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);

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
        bookNow4();
    };

    const handleBookNow = async (id) => {
        const response = await SelectTypeOfReqApi(id);
        console.log(response.data.result, "result");
        setSport(response.data.result);
        bookNow();
    };

    const handleSelectedSport = async (id) => {
        setSelectedSport(id.value);
        console.log(id, "value");
        const response = await GroundFetchOnSelectReqApi(id);
        if (response.status === 201) {
            setGround(response.data.result);
            setSelectedEvent(response.data.result);
            bookNow1();
        }
    };

    const handleSelectGround = async (id) => {
        const response = await EventFetchOnSelectReqApi(id);
        setTime(response.data.slots);
        setEventOnTime(response.data.result[0]);
        bookNow2();
    };
    // console.log(time, "times");
    const handleClearSelection = async () => {
        setSelectSlot([]);
        setPrice(0);
        bookNow4();
        setShowDiv4(false);
    };

    // pagination starts
    const perPage = 3;
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    let records;
    let nPage;
    let numbers;
    if (review.length > 0) {
        records = review.slice(firstIndex, lastIndex);
        nPage = Math.ceil(review.length / perPage);
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
    // pagination ends

    const handleBookingSubmit = async () => {
        setBookingData({
            date: date,
            price: price,
            eventId: eventOnTime._id,
            groundId: id,
            time: selectSlot,
            sport: selectedSport,
        });
        setShowModal(true);
        bookNow();
        bookNow1();
        bookNow2();
        bookNow3();
        bookNow4();
        setPrice(0);
        setSelectSlot([]);
    };

    useEffect(() => {
        if (id) {
            GroundData();
            SelectTypeOfReqApi(id).then((res) => {
                setSport(res.data.result);
                bookNow();
            });
        } else {
            console.log("use");
        }
    }, [id]);

    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="w-9/12">
                    <div>
                        <h1 className="text-3xl font-bold text-lime-600 my-3">{state?.name} -by Go Play</h1>
                    </div>
                    {/* GroundDetailComponent */}

                    <GroundDetailComponent reviewDiv={reviewDiv} state={state} handleBookNow={handleBookNow} />
                    <div ref={movingDiv}>
                        <div className="text-lime-600 text-2xl font-bold">Step 1: Select Sport</div>
                        <div className="flex">
                            {sport ? (
                                sport.map((res) => {
                                    return (
                                        <div
                                            className={`${
                                                step1 === res ? "bg-amber-500" : "bg-gray-200"
                                            } px-4 py-2 m-2 mb-10`}
                                            key={Math.floor(Math.random) * 0.2351 + 124}
                                            onClick={() => {
                                                setStep1(res);
                                                handleSelectedSport({ value: res, groundId: state._id });
                                            }}
                                        >
                                            {res}
                                        </div>
                                    );
                                })
                            ) : (
                                <div>Turf under process</div>
                            )}
                        </div>
                        {loader && <Loader />}
                    </div>
                    {showDiv1 && (
                        <div ref={movingDiv1}>
                            <div className="text-lime-600 text-2xl font-bold">Step 2: Select Ground</div>
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
                                            <div className="mb-3">{res.groundName}</div>
                                            <div>-{res.type}</div>
                                            <div>-{res.size}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {showDiv2 && (
                        <div ref={movingDiv2}>
                            <div className="text-lime-600 mb-5 text-2xl font-bold">Step 3: Select Date</div>
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
                        <div ref={movingDiv3}>
                            <div className="text-lime-600 text-2xl font-bold mt-5">Step 4: Select Time</div>
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
                                            <div className="m-2">
                                                {parseInt(res.index) > 17 || parseInt(res.index) < 6 ? (
                                                    <>
                                                        {res.booked ? (
                                                            <div className="pt-5 bg-red-500 h-16 text-center py-2  w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100 ">
                                                                Booked
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className={` ${
                                                                    res.onBooking ? "bg-amber-500" : "bg-gray-200"
                                                                } h-fit py-2 ps-3 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100`}
                                                                onClick={() =>
                                                                    handleBooking({
                                                                        timeId: res._id,
                                                                        slots: res.time,
                                                                        price: eventOnTime.priceAtNight,
                                                                        sport: selectedSport,
                                                                    })
                                                                }
                                                            >
                                                                {res.time}
                                                                <br></br>
                                                                Rs.{eventOnTime.priceAtNight}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {res.booked ? (
                                                            <div className="pt-5 bg-red-500 h-16 text-center py-2  w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100 ">
                                                                Booked
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className={` ${
                                                                    res.onBooking ? "bg-amber-500" : "bg-gray-200"
                                                                } h-fit py-2 ps-3 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100`}
                                                                onClick={() =>
                                                                    handleBooking({
                                                                        timeId: res._id,
                                                                        slots: res.time,
                                                                        price: eventOnTime.price,
                                                                        sport: selectedSport,
                                                                    })
                                                                }
                                                            >
                                                                {res.time}
                                                                <br></br>
                                                                Rs.{eventOnTime.price}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="flex" onClick={handleClearSelection}>
                                <FiDelete size={23} className="me-3" /> Clear Selection
                            </div>
                        </div>
                    )}
                    {showDiv4 && (
                        <div ref={movingDiv4} className="flex justify-center">
                            <div className="fixed flex justify-between bg-green-400 w-3/5 bottom-2">
                                <p></p>
                                <p className="p-3">Date: {new Date(date).toDateString()}</p>
                                <p className="p-3">Total Slot booked: {selectSlot ? selectSlot.length : ""}</p>
                                <p className="p-3">Total price: {price ? price : ""}</p>
                                <p className="p-3">Total price: {price ? price : ""}</p>
                                <p className=" bg-orange-400 m-1 p-2 rounded" onClick={handleBookingSubmit}>
                                    Book Now
                                </p>
                                {showModal && (
                                    <ModalBookingComponent bookingData={bookingData} setShowModal={setShowModal} />
                                )}
                                <p></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-9/12">
                    <div className="">
                        <RulesComponent state={state} />
                    </div>
                    <div className="pb-10 border-b">
                        <ReviewComponent
                            nextPage={nextPage}
                            changeCPage={changeCPage}
                            numbers={numbers}
                            currentPage={currentPage}
                            prePage={prePage}
                            moveToReview={moveToReview}
                            review={review}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroundViewPage;
