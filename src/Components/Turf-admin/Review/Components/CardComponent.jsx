import React from "react";
import { MdSpeakerNotes } from "react-icons/md";

function CardComponent({ reviewFetch }) {
    return (
        <div className=" gap-5">
            <div className="relative bg-gradient-to-r from-[#8aff00] to-[#e4ff00] mt-6 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="p-6">
                    <MdSpeakerNotes size={40} />
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"></h5>
                    <div className="flex items-center mb-4 space-x-4 mt-4">
                        <div className="space-y-1 font-medium dark:text-white">
                            <p>
                                {reviewFetch?.client?.name}
                                <time className="block text-sm text-gray-500 dark:text-gray-400">
                                    Joined on {new Date(reviewFetch?.client.createdAt).toDateString()}
                                </time>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center mb-1">
                        {Array(5)
                            .fill("")
                            .map((e, index) => {
                                return (
                                    <span key={index}>
                                        <svg
                                            aria-hidden="true"
                                            className={`w-5 h-5  ${
                                                index < reviewFetch?.rating ? "text-[#FF0800]" : "text-gray-400"
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    </span>
                                );
                            })}
                    </div>
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        {reviewFetch?.review}
                    </p>
                </div>
                <div className="ps-5 space-y-1 font-medium dark:text-white">{reviewFetch?.turf?.name}</div>
                <div className="p-6 pt-0"></div>
            </div>
        </div>
    );
}

export default CardComponent;
