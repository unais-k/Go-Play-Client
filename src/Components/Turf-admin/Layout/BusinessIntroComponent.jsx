import React from "react";
import { useNavigate } from "react-router-dom";

function BusinessIntroComponent() {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate("/turf-admin/register");
    };
    return (
        <div className="w-9/12 h-fit m-auto flex justify-center items-center">
            <div className="px-4">
                <h2 className="max-w-2xl font-turfRegister mx-auto text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-gray-800 xl:text-3xl dark:text-white">
                    Bring your Business to the next level
                </h2>

                <h1 className="max-w-4xl mt-6 text-3xl font-bold  text-lime-600">How it Works: BUSINESSES</h1>

                <p className="text-lime-600 text-sm mt-2 font-normal">Step1- SETUP YOUR BUSINESS:</p>
                <h3 className="text-dark text-sm mt-2 font-normal">
                    Easily setup your Business by providing Owner information and Aadhar detail. Register to start your
                    setup.
                </h3>

                <p className="text-lime-600 text-sm mt-2 font-normal">Step2- APPROVAL:</p>
                <h3 className="text-dark text-sm mt-2 font-normal">
                    Go-Play makes sure that Vendors registered on our platform are Accurate and Genuine. Once a Company is
                    approved, Company Admin can setup their Venue information, which will undergo Approval process for
                    accuracy and genuinity. Company Admin will receive a PDF with instructions on approval of the
                    registration form.
                </h3>

                <p className="text-lime-600 text-sm mt-2 font-normal">Step3- SETUP YOUR Venue INFORMATION:</p>
                <h3 className="text-dark text-sm mt-2 font-normal">
                    Setup Venue/Ground information: Sports Played, Size, Rates, Address, Contact etc. for Users to see and
                    find you. Once the information is entered, you will be ready to accept Bookings from Customers.
                </h3>

                <p className="text-lime-600 text-sm mt-2 font-normal">Step4- RECEIVE BOOKINGS FROM Go-Play:</p>
                <h3 className="text-dark text-sm mt-2 font-normal">
                    Clients can reach your venue and choose the option you provide and book for certain slots for their
                    acquired time, Booking will be shown accordingly
                </h3>

                <p className="text-lime-600 text-sm mt-2 font-normal">Step5- GROW YOUR BUSINESS:</p>
                <h3 className="text-dark text-sm mt-2 font-normal">
                    Keep track of your account performance through your personalized performance dashboard and customized
                    reports. Dashboard segregated based on Venues, for you to know exactly which Venue is performing better
                    for you.
                </h3>

                <div className="inline-flex w-full mt-6 mb-10 sm:w-auto">
                    <a
                        onClick={handleRegister}
                        className="inline-flex uppercase items-center text-sm font-semibold justify-center w-full px-6 py-2 text-white duration-300 bg-amber-500 hover:text-black hover:bg-amber-600 "
                    >
                        Register for company
                    </a>
                </div>
            </div>
        </div>
    );
}

export default BusinessIntroComponent;
