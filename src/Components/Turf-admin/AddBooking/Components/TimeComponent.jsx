import React from "react";

function TimeComponent({ time, handleBooking, eventOnTime, selectedSport }) {
    return (
        <div className="m-2">
            {parseInt(time.index) > 17 || parseInt(time.index) < 6 ? (
                <>
                    {time.booked ? (
                        <div className="pt-5 bg-red-500 h-16 text-center py-2  w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100 ">
                            Booked
                        </div>
                    ) : (
                        <div
                            className={` ${
                                time.onBooking ? "bg-amber-500" : "bg-gray-200"
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
                            <br></br>
                            Rs.{eventOnTime.priceAtNight}
                        </div>
                    )}
                </>
            ) : (
                <>
                    {time.booked ? (
                        <div className="pt-5 bg-red-500 h-16 text-center py-2  w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gary-200 duration-100 ">
                            Booked
                        </div>
                    ) : (
                        <div
                            className={` ${
                                time.onBooking ? "bg-amber-500" : "bg-gray-200"
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
                            <br></br>
                            Rs.{eventOnTime.price}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TimeComponent;
