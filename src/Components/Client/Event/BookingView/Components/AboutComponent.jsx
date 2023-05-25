import React from "react";
import { FaUserAlt } from "react-icons/fa";

function AboutComponent({ details }) {
    return (
        <>
            <div className="bg-white w-full p-3 shadow-sm rounded-sm">
                <div className=" space-x-2 font-semibold text-gray-900 leading-8">
                    <div className="flex">
                        <span className=" text-green-500 pt-1">
                            <FaUserAlt size={20} />
                        </span>
                        <span className="tracking-wide">&nbsp;About</span>
                    </div>
                </div>
                <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Ground Name : </div>
                            <div className="px-4 py-2">{details[0]?.turf?.name}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Sport Selected</div>
                            <div className="px-4 py-2">{details[0]?.sport}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Starting Date</div>
                            <div className="px-4 py-2">{new Date(details[0]?.bookDate).toDateString()}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Ending Date</div>
                            <div className="px-4 py-2">{new Date(details[0]?.bookDate).toDateString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutComponent;
