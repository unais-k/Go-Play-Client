import React from "react";
import { MdFileDownloadDone, MdOutlineCancelPresentation } from "react-icons/md";
function InboxPage({ handleCancel, handleApprove, list }) {
    return (
        <>
            <div className="flex flex-wrap">
                {list ? (
                    <div className="px-5 py-6 flex flex-col justify-center sm:py-12">
                        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r to-emerald-600 from-sky-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                            <div className="relative px-4 py-10 bg-stone-100 shadow-lg sm:rounded-3xl sm:p-10">
                                <div className="max-w-md mx-auto ">
                                    <div className="divide-y divide-gray-200">
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {list.name}
                                            </h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            Email : {list.email}
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            Phone : {list.phone}
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            Aadhar : {list.aadhar}
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            Pan : {list?.pan}
                                        </p>
                                        <div className="flex">
                                            <div
                                                className="bg-lime-500 text-white flex py-2 px-3 me-3 rounded"
                                                onClick={() => handleApprove({ id: list._id })}
                                            >
                                                <MdFileDownloadDone size={22} />
                                                <button className="ms-3 text-xs uppercase font-semibold">Approve</button>
                                            </div>
                                            <div
                                                className="bg-red-500 text-dark flex py-2 px-3 ms-3 rounded"
                                                onClick={() => handleCancel({ id: list._id })}
                                            >
                                                <MdOutlineCancelPresentation size={22} />
                                                <button className="ms-3 text-xs uppercase font-semibold">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>No new Notification</div>
                )}
            </div>
        </>
    );
}

export default InboxPage;
