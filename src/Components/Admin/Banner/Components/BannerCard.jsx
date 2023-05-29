import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

function BannerCard({ banner }) {
    return (
        <div className="bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 rounded-lg p-4">
            {banner?.map((res) => {
                return (
                    <div key={res._id} className="container mb-10 items-center">
                        <div className="flex justify-center">
                            <a className="group relative block h-64 sm:h-80 lg:h-96">
                                <span className="absolute inset-0 border-2 border-dashed border-black"></span>
                                <div className="relative flex w-96 h-full transform items-end border-2 border-black bg-white transition-transform translate-x-2 translate-y-2">
                                    <img className="absolute top-0 p-10 w-88 h-88" src={res?.photo} alt="" />
                                    <div className="p-4 w-full !pt-0 transition-opacity sm:p-6 lg:p-8">
                                        <h2 className="mt-4 text-center text-xl font-medium sm:text-2xl">
                                            Title : {res?.title}
                                        </h2>
                                        <div className="flex justify-between">
                                            <span>
                                                <MdDeleteForever size={23} />
                                            </span>
                                            <span>
                                                <FiEdit2 size={23} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default BannerCard;
