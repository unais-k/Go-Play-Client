import React from "react";
import { AiFillFolderOpen } from "react-icons/ai";

function TableComponent({ event, handleSelectView }) {
    return (
        <>
            <tr className="border-b rounded border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center">{new Date(event.bookDate).toDateString()}</div>
                </td>
                <td className="py-3 px-6 text-center">
                    <div className="font-medium items-center">
                        {event.time.map((res) => {
                            return (
                                <span key={res._id}>
                                    <div className="flex flex-col">{res.slots}</div>
                                </span>
                            );
                        })}
                    </div>
                </td>
                <td className="py-3 px-6 text-center">
                    <div onClick={() => handleSelectView(event._id)} className="flex item-center justify-center">
                        <AiFillFolderOpen size={23} />
                    </div>
                </td>
                <td className="py-3 px-6 text-center">
                    {event.status ? (
                        <div className=" font-medium">
                            <span>{event.status}</span>
                        </div>
                    ) : (
                        <div
                            // onClick={() =>
                            //     handleCancel({ id: event._id })
                            // }
                            className=" bg-red-500 text-white font-medium "
                        >
                            <div className="px-3 py-2 ">Cancel</div>
                        </div>
                    )}
                </td>
            </tr>
        </>
    );
}

export default TableComponent;
