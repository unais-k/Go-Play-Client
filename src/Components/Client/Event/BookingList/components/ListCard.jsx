import React from "react";
import { useNavigate } from "react-router-dom";

function ListCard({ booking }) {
    const navigate = useNavigate();
    console.log(booking);

    const handleView = (data) => {
        console.log(data);
        navigate("/event-booking-view/" + data);
    };
    return (
        <div>
            <div class="relative flex w-96 flex-col rounded-xl bg-stone-100 bg-clip-border text-gray-700 shadow-md">
                <div class="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg ">
                    <img className="w-full h-full" src={booking?.turf?.images} alt="img-blur-shadow" layout="fill" />
                </div>
                <div class="p-6">
                    <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {booking?.turf?.name}
                    </h5>
                    <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        Event Starts at {booking?.bookDate}
                    </p>
                </div>
                <div class="p-6 pt-0">
                    <button
                        onClick={() => handleView(booking?._id)}
                        class="select-none rounded-lg bg-[#71eb71] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ListCard;
