import React from "react";

function TableComponent({ data }) {
    return (
        <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2"></div>
            <div className="text-gray-900 font-normal text-md mb-2"></div>
            <table className="min-w-max w-full table-auto">
                <thead>
                    <tr className="text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-center">Time</th>
                        <th className="py-3 px-6 text-center">Date</th>
                        <th className="py-3 px-6 text-center">Sport</th>
                        <th className="py-3 px-6 text-center">Advance</th>
                        <th className="py-3 px-6 text-center">total</th>
                        <th className="py-3 px-6 text-center">Booking status</th>
                        {/* <th className="py-3 px-6 text-center">View</th> */}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                                <div className=" text-center">
                                    <span className="font-medium ">{data?.client?.name || data?.name}</span>
                                </div>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center whitespace-nowrap">
                            <div className="text-center">
                                {data?.time?.map((res) => {
                                    return <span key={res._id}>{res?.slots}</span>;
                                })}
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center font-bold">
                            <div className="items-center justify-center">{new Date(data.bookDate).toDateString()}</div>
                        </td>
                        <td className="py-3 px-6 text-center font-bold">
                            <div className="items-center justify-center">{data?.sport}</div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="text-center">
                                <span className="font-medium text-xl">{data?.advance}</span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className="text-center">
                                <span className="font-medium text-xl">{data?.total}</span>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                            <div className=" text-center">{data?.status}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
