import React from "react";

function Footer() {
    return (
        <div>
            <div className="footer bg-zinc-700 w-full flex justify-center items-center text-white">
                <div className="w-2/3 mb-20">
                    <div className="logo-name flex my-8">
                        <img src="/logo-no-background.png" className="w-20 h-12" alt="footer-logo" />
                        <h1 className="go-play-logo font-bold text-xl ">GO-Play</h1>
                    </div>
                    <div className="flex justify-content-evenly  ">
                        <div div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                            <div className="me-20 mb-4">
                                <ul className=" list-none ">
                                    <li className=" font-semibold">CUSTOMER SUPPORT</li>
                                    <li className="font-sans text-zinc-400">Book Online</li>
                                    <li className="font-sans text-zinc-400">Cancel Booking</li>
                                    <li className="font-sans text-zinc-400">Cancel Booking</li>
                                    <li className="font-sans">Customer care</li>
                                </ul>
                            </div>
                            <div>
                                <ul className="heads list-none ">
                                    <li className=" font-semibold">GO PLAY</li>
                                    <li className="font-sans text-zinc-400">About Us</li>
                                    <li className="font-sans text-zinc-400">Press</li>
                                    <li className="font-sans text-zinc-400">Contact Us</li>
                                    <li className="font-sans text-zinc-400">We are hiring</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
