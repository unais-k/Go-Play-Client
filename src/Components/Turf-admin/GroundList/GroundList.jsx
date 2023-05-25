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
                                {state?.map((res, index) => {
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
                                                No Plot added yet
                                            </p>
                                        </div>
                                        <div className="max-w-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                className="w-40 h-40 dark:text-gray-600"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
                                                ></path>
                                                <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                                                <polygon
                                                    fill="currentColor"
                                                    points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
                                                ></polygon>
                                                <polygon
                                                    fill="currentColor"
                                                    points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
                                                ></polygon>
                                            </svg>
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
