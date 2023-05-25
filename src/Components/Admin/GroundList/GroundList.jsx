import React, { useEffect, useState } from "react";
import { TbLockOpen, TbLockOpenOff } from "react-icons/tb";
import { GrView } from "react-icons/gr";
import { BlockGroundReqApi, UnblockGroundReqApi, groundListAdminReqApi } from "../../../API/Services/AdminRequest";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";

function GroundListPageAdmin() {
    const token = useSelector((state) => state.adminLogin.token);
    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const [loader, setLoader] = useState(false);

    const groundList = async () => {
        setLoader(true);
        const response = await groundListAdminReqApi(token);

        if (response.status === 200) {
            setState(response.data.result);
            setLoader(false);
        } else {
            message.error("Something went wrong");
        }
    };

    const handleBlock = async (id) => {
        const response = await BlockGroundReqApi(id, token);
        await groundList();
    };
    const handleUnBlock = async (id) => {
        const response = await UnblockGroundReqApi(id, token);
        await groundList();
    };

    useEffect(() => {
        groundList();
    }, [""]);

    const handleGroundView = async (id) => {
        navigate("/admin/ground-view/" + id);
    };

    return (
        <div className="">
            <div>
                <h1 className="w-full ms-4 my-3 font-normal text-2xl font-heading uppercase">Ground-List</h1>
            </div>
            <div className="">
                <div className="min-w-screen flex items-center justify-center font-sans">
                    <div className="">
                        {loader && <Loader />}
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Profile</th>
                                        <th className="py-3 px-6 text-center">Name</th>
                                        <th className="py-3 px-6 text-center">Owner</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                        <th className="py-3 px-6 text-center">View</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {state?.map((res) => {
                                        return (
                                            <tr key={res._id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="flex justify-center">
                                                    <img className="w-10 h-10  rounded-full" src={res?.images[0]} />
                                                </td>
                                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                                    <div className=" text-center">
                                                        <span className="font-medium ">{res?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center font-bold">
                                                    <div className="items-center justify-center">{res?.Owner?.name}</div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    {res?.status ? (
                                                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                                            Blocked
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-center">
                                                        {res?.status ? (
                                                            // (
                                                            //     <div
                                                            //         className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                            //         onClick={() => handleUnBlock(res?._id)}
                                                            //     >
                                                            //         <TbLockOpenOff size={20} />
                                                            //     </div>
                                                            // )
                                                            <div
                                                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                                onClick={() => handleUnBlock(res?._id)}
                                                            >
                                                                <TbLockOpen size={20} />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                                onClick={() => handleBlock(res?._id)}
                                                            >
                                                                <TbLockOpenOff size={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-center">
                                                        <div
                                                            onClick={() => handleGroundView(res?._id)}
                                                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                        >
                                                            <GrView size={20} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroundListPageAdmin;
