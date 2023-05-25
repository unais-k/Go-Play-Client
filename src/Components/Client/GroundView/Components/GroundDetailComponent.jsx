import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import WeeklyComponent from "./Event/EventComponent";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Turf-admin/Layout/Loader";

function GroundDetailComponent({ reviewDiv, rating, state, handleBookNow }) {
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const handleViewEvent = () => {
        navigate("/event", {
            state: {
                groundDetail: state,
            },
        });
    };
    console.log(state, "line 17");
    useEffect(() => {
        if (state.name) {
            setLoader(false);
        } else {
            setLoader(true);
        }
    });

    return (
        <div className="flex">
            <div className="w-9/12 flex flex-col">
                <div className="">
                    {/* {state?.images?.length >
                        0?.(<img className="w-full h-96" src={state?.images[0]} alt="image of turf" />)} */}

                    {state?.images ? (
                        <img className="w-full h-96" src={state?.images[0]} alt="image of turf" />
                    ) : (
                        "no image"
                    )}
                </div>
                {loader && <Loader />}
                <div className="h-52 w-full flex mt-3">
                    <marquee behavior="alternate" direction="left">
                        <div className="flex ms-3 ">
                            {state?.images?.map((res) => {
                                return <img className="w-52 h-56 ms-1 me-1" src={res} alt="" />;
                            })}
                            {/* <img className="w-52 h-56 ms-1 me-1" src="/box-img.jpg" alt="" />
                            <img className="w-52 h-56 ms-1 me-1" src={state.images} alt="" />
                            <img className="w-52 h-56 ms-1 me-1" src={state.images} alt="" />
                            <img className="w-52 h-56 ms-1 me-1" src="/box-img.jpg" alt="" /> */}
                        </div>
                    </marquee>
                </div>
            </div>
            <div className="w-6/12">
                <div className="text-left m-3">
                    <p className="pt-3 mb-3">
                        {state?.address}
                        {state?.place},{state?.nearCity}
                    </p>
                    <p className="mb-3 flex text-amber-500">
                        <div className="flex w-fit px-3 py-0.5 ms-2 bg-green-700 text-white me-3">
                            <AiFillStar className="pt-1" size={20} color="white" />
                            1.1111
                        </div>
                    </p>
                    <p>Dial :{state?.phone}</p>
                </div>
                <div>
                    <button className="bg-amber-500 text-white px-4 py-2 m-4" onClick={() => handleBookNow(state._id)}>
                        Book now
                    </button>
                </div>
                <div className="flex justify-center">
                    <div onClick={() => handleViewEvent()}>
                        <WeeklyComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroundDetailComponent;
