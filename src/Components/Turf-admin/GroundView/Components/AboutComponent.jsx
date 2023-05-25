import React, { useEffect, useState } from "react";
import { AvailableStatusChangeReqApi } from "../../../../API/Services/TurfAdminRequest";
import { useSelector } from "react-redux";
import { message } from "antd";

function AboutComponent({ viewData }) {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [toggle, setToggle] = useState(false);
    const date = new Date(viewData.createdAt).toDateString();

    const handleToggle = async () => {
        setToggle((current) => !current);

        const id = viewData._id;
        const response = await AvailableStatusChangeReqApi({ toggle: toggle }, id, token);
        if (response.status === 200) {
            console.log(response.data.result, "line 17");
            if (response.data.result.status === true) {
                message.success("Venue Available");
            } else {
                message.warning("Venue not available");
            }
        } else {
            message.error("Something went wrong");
        }
    };
    useEffect(() => {}, [toggle]);

    return (
        <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                    <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </span>
                <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Owner name</div>
                        <div className="px-4 py-2">{viewData?.Owner?.name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Venue Name</div>
                        <div className="px-4 py-2">{viewData?.name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                        <div className="px-4 py-2">+91{viewData?.phone}</div>
                    </div>

                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Available Status</div>
                        <div className="px-4 py-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={viewData?.status}
                                    onClick={handleToggle}
                                    className="sr-only peer"
                                    checked={toggle}
                                />
                                <div
                                    className={`w-11 h-6 ${
                                        viewData?.status
                                            ? "bg-blue-600 peer-checked:bg-gray-200"
                                            : "bg-gray-200 peer-checked:bg-blue-600"
                                    } peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                                ></div>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Email.</div>
                        <div className="px-4 py-2">
                            <a className="" href={`mailto:${viewData?.email}`}>
                                {viewData?.email}
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Created At</div>
                        <div className="px-4 py-2">{date}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutComponent;
