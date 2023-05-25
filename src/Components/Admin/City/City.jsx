import React, { useEffect, useState } from "react";
import { addCityReqApi, findCityReqApi } from "../../../API/Services/AdminRequest";
import { useSelector } from "react-redux";
import { message } from "antd";
import { toast } from "react-toastify";

function CityPage() {
    const token = useSelector((state) => state.adminLogin.token);
    const [state, setState] = useState(null);
    const [list, setList] = useState([]);

    useEffect(() => {
        if (token) findCity();
    }, [token]);

    const findCity = async () => {
        await findCityReqApi(token).then(async (response) => {
            if (response.status === 200) {
                setList(response.data.result);
            } else {
                message.error("Something went wrong find");
            }
        });
    };
    const handleOnChange = (e) => {
        setState(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state === null) {
            toast.error("Please fill the field");
        } else {
            const response = addCityReqApi({ data: state }, token);
            if (response.status === 201) {
                setList(response.data.result);
                message.success("City created");
            } else {
                message.error("Something went wrong");
            }
        }
    };
    return (
        <div>
            <div>
                <h1 className="w-full ms-4 my-3 font-normal text-2xl  font-heading uppercase">City-List</h1>
            </div>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit}>
                    <div className="card w-full bg-base-100 shadow-xl my-3 mx-4 rounded p-3 flex">
                        <input
                            className="shadow appearance-none border rounded w-full ps-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            name="city"
                            type="city"
                            onChange={(e) => handleOnChange(e)}
                            placeholder="Enter a new City"
                        />

                        <div className="card-actions m-3">
                            <button className="bg-blue-700 px-4 py-2 rounded text-dark" type="submit">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="mt-10">
                <div className="">
                    <div className="min-w-screen  flex items-center justify-center font-sans overflow-hidden">
                        <div className="w-2/5 h-fit ">
                            <div className="bg-white shadow-md overflow-y-auto rounded my-6">
                                <table className="min-w-max w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">City</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-xl font-admin h-[100px] overflow-y-scroll">
                                        {list?.length &&
                                            list?.map((res, index) => {
                                                return (
                                                    <tr
                                                        key={res._id}
                                                        className="border-b border-gray-200 hover:bg-gray-100"
                                                    >
                                                        <td className="py-3 px-6">
                                                            <div className="flex items-left">{res?.City}</div>
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

export default CityPage;
