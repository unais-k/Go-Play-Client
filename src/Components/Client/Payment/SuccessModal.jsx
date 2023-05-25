import React from "react";
import { useNavigate } from "react-router-dom";

function SuccessModal({ setModal }) {
    const navigate = useNavigate();
    const handleSubmit = async () => {
        console.log(44);
        navigate("/booking");
        setModal(false);
    };
    return (
        <div>
            {/*  */}
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="bg-white p-6  md:mx-auto">
                            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                                <path
                                    fill="currentColor"
                                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                                ></path>
                            </svg>
                            <div className="text-center">
                                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                                    Payment Done!
                                </h3>
                                <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                                <p> Have a great day! </p>
                                <div className="py-10 text-center">
                                    <button
                                        onClick={() => handleSubmit()}
                                        className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                                    >
                                        GO HOME
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setModal(false)}
              >
                Save Changes
              </button>
            </div> */}
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 h-screen"></div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            {/*  */}
        </div>
    );
}

export default SuccessModal;
