import React from "react";
import { useNavigate } from "react-router-dom";

export default function Modal({ setModal }) {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/turf-admin/home");
    };
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl font-bold uppercase">Register success</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-2 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setModal(false)}
                            >
                                X
                            </button>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <h1 className="font-bold text-xl text-center md:text-left p-5">
                                Your Account is under verification it may take up to 48 hours, but you can further continue
                                and add your venue, but it will only available for customers after admin verified
                            </h1>
                            <div className="mt-6 text-center md:text-left">
                                <p className="font-serif">
                                    For further Details Contact us:-
                                    <br className="md:hidden" /> go-play@gmail.com
                                </p>
                            </div>
                            <div className="mt-4 pb-4">
                                <button className="bg-black rounded text-white px-3 py-2" onClick={handleHome}>
                                    Continue
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
