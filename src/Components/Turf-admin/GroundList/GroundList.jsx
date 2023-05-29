import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroundListReqApi } from "../../../API/Services/TurfAdminRequest";
import { message } from "antd";
import { useSelector } from "react-redux";
import ListCard from "./ListCard";
import Loader from "../Layout/Loader";

function TurfGroundListPage() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const handleAddGround = () => {
        navigate("/turf-admin/ground-add");
    };
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [state, setState] = useState([]);
    useEffect(() => {
        GroundList();
    }, []);
    const GroundList = async () => {
        setLoader(true);
        await GroundListReqApi(token).then((response) => {
            if (response.status === 201) {
                setState(response.data.result);
                setLoader(false);
            } else {
                message.error("No response in list req");
            }
        });
    };

    return (
        <div className="pt-20">
            <button
                onClick={handleAddGround}
                className="text-dark ms-5 bg-amber-500 rounded text-sm font-bold uppercase px-4 py-2"
            >
                Add Ground
            </button>
            <div className="">
                {loader && <Loader />}
                <div className="container mt-5 mb-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        {state?.length > 0 ? (
                            <>
                                {state?.map((res) => {
                                    return (
                                        <div key={res._id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                                            <ListCard res={res} />
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                <div className="w-fit h-fit flex items-center">
                                    <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                                        <div className="max-w-md pr-20">
                                            <p className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-3xl font-bold uppercase">
                                                Please Add Plot
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TurfGroundListPage;
