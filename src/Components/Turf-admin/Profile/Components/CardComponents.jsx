import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import PopoverRender from "./DropDown";

function CardComponents({ data, setShowModal }) {
    return (
        <>
            <section className="bg-gradient-to-r from-[#000000] to-[#494747]  w-64 mx-auto rounded-2xl px-8 py-6 shadow-lg">
                <div className="flex items-center justify-between">
                    {/* <span className="text-gray-400 text-sm">2d ago</span> */}

                    {/* <span className="text-emerald-400">
                        <BsThreeDots size={25} />
                    </span> */}
                    <PopoverRender setShowModal={setShowModal} />
                </div>
                <div className="mt-6 w-fit mx-auto">
                    <img src={data?.profile} className="rounded-full w-28 " alt="profile picture" srcset="" />
                </div>
                <div className="mt-8 ">
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold text-2xl tracking-wide">
                        {data?.name}
                    </h2>
                </div>
                <div className="flex justify-start">
                    <p className="text-emerald-400 font-semibold mt-2.5">Place</p>&nbsp;
                    <p className="text-emerald-400 font-semibold mt-2.5">{data?.place}</p>
                </div>
            </section>
        </>
    );
}

export default CardComponents;
