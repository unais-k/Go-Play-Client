import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function ListEvent({ event }) {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    const handleEdit = (id) => {
        navigate("/turf-admin/edit-event/" + id);
    };
    const handleToggle = async () => {
        setToggle((current) => !current);
    };

    useEffect(() => {}, [toggle]);

    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Event name
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Available
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Handle
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event?.length > 0 &&
                                        event?.map((res, index) => {
                                            return (
                                                <tr
                                                    key={Math.round(Math.random * 12 * 12 + 24)}
                                                    className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{res.groundName}</td>

                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                value={res?.eventStatus}
                                                                onClick={handleToggle}
                                                                className="sr-only peer"
                                                                checked={toggle}
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </td>
                                                    <td
                                                        className="whitespace-nowrap px-6 py-4"
                                                        onClick={() => handleEdit(res._id)}
                                                    >
                                                        <BiEditAlt size={23} />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListEvent;
