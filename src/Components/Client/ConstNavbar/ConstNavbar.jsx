import React, { useState } from "react";
import "./ConstNavbarPage.css";
import { useNavigate } from "react-router-dom";
function ConstNavbar() {
    const navigate = useNavigate();
    const handleFootball = () => {
        navigate("/football-turfs");
    };
    let [open, setOpen] = useState(false);
    return (
        <div className="border-t">
            <div className="w-full py-4 top-0 left-0">
                <div className="md:flex items-center justify-center bg-white py-5 md:px-10 px-7">
                    <div
                        onClick={() => setOpen(!open)}
                        className="text-3xl absolute right-8 top-13 cursor-pointer md:hidden"
                    >
                        <ion-icon className="bg-dark" name={open ? "close" : "menu"}></ion-icon>
                    </div>

                    <ul
                        className={`md:flex md:items-center md:pb-0 pb-12 md:static bg-white left-0 w-full md:w-auto md:pl-0 pl-9 ${
                            open ? "top-14" : "top-[-490px] absolute"
                        }`}
                    >
                        <li>
                            <a className="flex">
                                <div>
                                    <div className="left-b pt-2 pb-3 ps-2 me-3 border-r border-zinc-300">
                                        <img
                                            src="/all-sports.png"
                                            alt="football"
                                            className="h-full"
                                            title="all sport grounds"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold">All Sports</div>
                                    <span className="">
                                        <p className="w-11/12 text-sm text-stone-500 ">See all ground of your city</p>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="flex" onClick={handleFootball}>
                                <div>
                                    <div className="left-b pt-2 pb-3 ps-2 me-3 border-r border-zinc-300">
                                        <img
                                            src="/football.png"
                                            alt="football"
                                            className="h-full"
                                            title="all sport grounds"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold">Football</div>
                                    <span className="">
                                        <p className="w-11/12 text-sm text-stone-500 ">See football ground of your city</p>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="flex">
                                <div>
                                    <div className="left-b pt-2 pb-3 ps-2 me-3 border-r border-zinc-300">
                                        <img
                                            src="/cricket.png"
                                            alt="cricket"
                                            className="h-full"
                                            title="all sport grounds"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold">Cricket</div>
                                    <span className="">
                                        <p className="w-11/12 text-sm text-stone-500 ">See cricket ground of your city</p>
                                    </span>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a className="flex">
                                <div>
                                    <div className="left-b pt-2 pb-3 ps-2 me-3 border-r border-zinc-300">
                                        <img
                                            src="/offers.png"
                                            alt="football"
                                            className="h-full"
                                            title="all sport grounds"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold">Events</div>
                                    <span className="">
                                        <p className="w-11/12 text-sm text-stone-500 ">Offers & discount</p>
                                    </span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ConstNavbar;
