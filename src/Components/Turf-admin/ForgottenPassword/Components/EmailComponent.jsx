import React from "react";
import { useNavigate } from "react-router-dom";

function EmailComponent({ handleSubmit, setEmail }) {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="">
            <div className=" h-screen">
                <div className="p-10 lg:w-1/2 mx-auto">
                    <div className="bg-lime-200 rounded-t-lg p-8">
                        <div>
                            <p className="text-center text-xl text-dark font-light">Email Verify</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                        <form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
                            <div className="relative mt-3">
                                <input
                                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                    id="username"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    placeholder="Email"
                                />
                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 ml-3 text-gray-400 p-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-8">
                                <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div className="flex justify-between mt-5">
                            <p className="text-start text-sm text-gray-500 font-light">
                                <a className="text-green-400" onClick={handleCancel}>
                                    Cancel
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmailComponent;
