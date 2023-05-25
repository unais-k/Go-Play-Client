import React from "react";

function ChatReqComponent({ handleApproveChat, data }) {
    return (
        <>
            <div className="flex flex-wrap">
                {data ? (
                    <div className="px-5 py-6 flex flex-col justify-center sm:py-12">
                        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r to-emerald-600 from-sky-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                            <div className="relative px-4 py-10 bg-stone-100 shadow-lg sm:rounded-3xl sm:p-10">
                                <div className="max-w-md mx-auto ">
                                    <div className="divide-y divide-gray-200">
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {data?.name}
                                            </h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            {data?.sender?.email}
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            He like to chat with you.
                                        </p>
                                        <div className="flex">
                                            <div
                                                className="bg-lime-500 mt-3 text-white flex py-2 px-3 me-3 rounded"
                                                onClick={() => handleApproveChat({ id: data.sender._id })}
                                            >
                                                <button className="text-xs uppercase font-semibold">Start Chat</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>No new notification</div>
                )}
            </div>
        </>
    );
}

export default ChatReqComponent;
