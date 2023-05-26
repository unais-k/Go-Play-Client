import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { GroundListReqApi, SearchGroundReqApi } from "../../../API/Services/ClientRequest";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Turf-admin/Layout/Loader";

function HomePage() {
    const dispatchLocation = useSelector((state) => state.userLogin.city);
    const token = useSelector((state) => state.userLogin.token);
    const navigate = useNavigate();
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    };
    const [ground, setGround] = useState([]);
    const [place, setPlace] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        if (dispatchLocation) groundList();
    }, [dispatchLocation]);

    const groundList = async () => {
        setLoader(true);
        const response = await GroundListReqApi(dispatchLocation);
        if (response.status === 200) {
            setGround(response.data.result);
            setPlace(response.data.result);
            setLoader(false);
        } else {
            message.error("Something went wrong");
        }
    };

    const APIcall = async (id) => {
        const response = await SearchGroundReqApi({ id: id, place: dispatchLocation });
        if (response.status === 201) {
            setGround(response.data.result);
        }
    };

    const handleSearch = async (e) => {
        APIcall(e.target.value);
    };

    const handleGroundCard = async (id) => {
        navigate(`/ground-view/${id}`);
    };
    return (
        <div className="home-dash">
            <div className="bannerPage">
                <div className="img-banner">
                    <img src="./sports-.jpg" alt="HomePage banner" />
                </div>
            </div>
            <div className="search-team text-center m-3">
                <div>
                    <h4 className=" text-green-700 m-2">
                        <b>Search for the best turf grounds, indoor courts grounds in your city</b>
                    </h4>
                </div>
                {loader && <Loader />}
                <div className="search-in flex justify-center">
                    <input
                        type="text"
                        name="search"
                        onChange={handleSearch}
                        className="w-8/12 bg-xx text-white placeholder-white"
                        placeholder="Search"
                    />
                    <span className="ps-4 pt-1 w-2/12 bg-ss">
                        <FiSearch size={30} color="white" />
                    </span>
                </div>
            </div>
            <div className="content-center bg-stone-100 pt-10 w-full flex justify-center items-center">
                <div className="featured  w-2/3">
                    <div className="h1-line ms-4">
                        <h1 className="text-3xl font-bold text-lime-600">Featured Listing</h1>
                        <p>See & book your ground from the list of most popular grounds in your city</p>
                    </div>
                    <div className="flex">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mb-16 gap-2">
                            {ground.length > 0 ? (
                                ground.map((res) => {
                                    return (
                                        <div
                                            key={res._id}
                                            className="w-11/12 h-auto bg-white p-3 m-4 h-fit"
                                            onClick={() => handleGroundCard(res._id)}
                                        >
                                            <div className="box-img mb-2">
                                                <img src={res.images[0]} className="w-full h-60" alt="box-img" />
                                            </div>
                                            <div className="img-head">
                                                <p className="font-bold text-lime-600 uppercase">
                                                    {truncate(res ? res?.name : "", 150)}
                                                </p>
                                                <p className="text-xs">
                                                    {res?.place},{res?.nearCity}
                                                </p>
                                            </div>
                                            <div className="books flex justify-between mt-4">
                                                <b className="text-amber-500 hover:text-zinc-950">BOOK NOW</b>
                                                <FaPlus size={15} className="mt-1" color="grey" />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="m-10">No Ground or turf in that Place</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-stone-100  w-full flex justify-center items-center">
                <div className="popular-locality w-2/3 bg-white mb-16 p-8 pt-12">
                    <h1 className="text-3xl font-bold text-lime-600">Popular Localities</h1>
                    <p>Explore grounds & venues in and around popular areas of your city</p>

                    <ul className="grid grid-cols-3 mt-10">
                        {place?.map((res, index) => {
                            return (
                                <li key={index} className="font-mono hover:text-amber-500">
                                    {res.place}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="w-full flex justify-center items-center mb-20">
                <div className="w-2/3 flex mt-4">
                    <div>
                        <h1 className="text-2xl font-bold text-lime-600">Come, Let's Pay...</h1>
                        <p className="text-sm">
                            When you book your ground online with us, you get to pay with credit card,
                        </p>

                        <p className="text-sm">debit card, net banking or with digital wallets too...</p>

                        <h4 className="text-lime-700 text-lg mt-6">
                            Looking for discounts & offers on your ground bookings?
                        </h4>
                        <div className="mt-4 w-4/5 flex justify-evenly">
                            <div className=" w-1/5 h-1/5">
                                <img className="w-20 h-16" src="/checkmark.png" alt="ph" />
                                <p className="text-xs">CONFIRMED BOOKINGS</p>
                            </div>
                            <div className=" w-1/5 h-1/5">
                                <img className="w-20 h-16" src="/project.png" alt="ph" />
                                <p className="text-xs">CONVENIENT PROCESS</p>
                            </div>
                            <div className=" w-1/5 h-1/5">
                                <img className="w-20 h-16" src="/buyer.png" alt="ph" />
                                <p className="text-xs">CASHLESS PAYMENTS</p>
                            </div>
                        </div>
                        <p className="mt-8">With Go-Play, you enjoy the process of ground booking as much as you</p>
                        <p>enjoy the game</p>
                        {token ? (
                            <></>
                        ) : (
                            <button onClick={() => navigate("/login")} className="text-white bg-amber-500 px-10 py-2 mt-3">
                                SIGN IN
                            </button>
                        )}
                    </div>
                    <div>
                        <img src="./football-photo.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
