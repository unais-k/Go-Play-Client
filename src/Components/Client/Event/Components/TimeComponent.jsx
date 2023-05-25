import React from "react";

function TimeComponent({ selectedSport, eventOnTime, handleBooking, time }) {
    return (
        <div className="m-2">
            {parseInt(time.index) > 17 || parseInt(time.index) < 6 ? (
                <>
                    {time.booked ? (
                        <div className="bg-red-500 h-fit text-center py-2  w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100 ">
                            Booked
                        </div>
                    ) : (
                        <div
                            className={` ${
                                time.onBooking ? "bg-orange-400" : "bg-gray-200"
                            } h-fit py-2 ps-3 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100`}
                            onClick={() =>
                                handleBooking({
                                    timeId: time._id,
                                    slots: time.time,
                                    price: eventOnTime.priceAtNight,
                                    sport: selectedSport,
                                })
                            }
                        >
                            {time.time}
                        </div>
                    )}
                </>
            ) : (
                <>
                    {time.booked ? (
                        <div className="bg-red-500 h-fit text-center py-2  w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100 ">
                            Booked
                        </div>
                    ) : (
                        <div
                            className={` ${
                                time.onBooking ? "bg-orange-400" : "bg-gray-200"
                            } h-fit py-2 ps-3 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100`}
                            onClick={() =>
                                handleBooking({
                                    timeId: time._id,
                                    slots: time.time,
                                    price: eventOnTime.price,
                                    sport: selectedSport,
                                })
                            }
                        >
                            {time.time}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TimeComponent;
