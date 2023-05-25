import React, { useEffect, useState } from "react";
import { OwnerListReqApi } from "../../../API/Services/AdminRequest";
import { useSelector } from "react-redux";
import { message } from "antd";
import { TbLockOpen, TbLockOpenOff } from "react-icons/tb";
import { GrView } from "react-icons/gr";
import Loader from "../Layout/Loader";

function OwnerListPage() {
    const [state, setState] = useState([]);
    const [loader, setLoader] = useState(false);
    const token = useSelector((state) => state.adminLogin.token);

    const getOwnerList = async () => {
        setLoader(true);
        const response = await OwnerListReqApi(token);
        if (response.status === 201) {
            setState(response.data.result);
            setLoader(false);
        } else {
            message.error("Something wrong try again later");
        }
    };

    useEffect(() => {
        getOwnerList();
    }, []);
    return (
        <div>
            <div className="">
                <div>
                    <h1 className="w-full ms-4 my-3 font-normal text-2xl font-heading uppercase">Owner-List</h1>
                </div>
                <div className="">
                    {loader && <Loader />}
                    <div className="min-w-screen flex items-center justify-center font-sans overflow-hidden">
                        <div className="w-full lg:w-5/6">
                            <div className="bg-white shadow-md rounded my-6">
                                <table className="min-w-max w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-center">Profile</th>
                                            <th className="py-3 px-6 text-center">Name</th>
                                            <th className="py-3 px-6 text-center">Phone</th>
                                            <th className="py-3 px-6 text-center">Email</th>
                                            <th className="py-3 px-6 text-center">Place</th>
                                            {/* <th className="py-3 px-6 text-center">Booking</th> */}
                                            {/* <th className="py-3 px-6 text-center">Actions</th> */}
                                            <th className="py-3 px-6 text-center">View</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                        {state.map((res) => {
                                            return (
                                                <tr key={res._id} className="border-b border-gray-200 hover:bg-gray-100">
                                                    <td className="text-center items-center ">
                                                        <div className="w-fit items-center mx-auto text-center">
                                                            <img className="w-10 h-10 rounded-full" src={res?.profile} />
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        <div className=" text-center">
                                                            <span className="font-medium ">{res.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                                        <div className=" text-center">
                                                            <span className="font-medium ">{res.phone}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        <div className=" text-center">
                                                            <span className="font-medium ">{res.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                                        <div className=" text-center">
                                                            <span className="font-medium ">{res.place}</span>
                                                        </div>
                                                    </td>
                                                    {/* <td className="py-3 px-6 text-center">
                                                        <div className="items-center justify-center">0</div>
                                                    </td> */}
                                                    {/* <td className="py-3 px-6 text-center">hello</td> */}
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex item-center justify-center">
                                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
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
        </div>
    );
}

export default OwnerListPage;
