import React from "react";
import ListingDataComponent from "./ListingDataComponent";

function ListEventComponent({ event }) {
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
                                            View
                                        </th>
                                    </tr>
                                </thead>
                                <ListingDataComponent event={event} />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListEventComponent;
