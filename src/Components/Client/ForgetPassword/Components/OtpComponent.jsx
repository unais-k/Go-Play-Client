import React, { useRef } from "react";

function OtpComponent({ handleOTP, otp, setOtp }) {
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);

    const handleChange = (e) => {
        setOtp({ ...otp, [e.target.name]: e.target.value });
    };

    const handleKeyUp = (e) => {
        if (e.target.value.length === e.target.maxLength) {
            switch (e.target.name) {
                case "otp1":
                    input2Ref.current.focus();
                    break;
                case "otp2":
                    input3Ref.current.focus();
                    break;
                case "otp3":
                    input4Ref.current.focus();
                    break;
                case "otp4":
                    input5Ref.current.focus();
                    break;
                case "otp5":
                    input6Ref.current.focus();
                    break;
                case "otp6":
                    input6Ref.current.focus();
                    break;
                default:
                    break;
            }
        } else if (e.target.value.length === 0) {
            switch (e.target.name) {
                case "otp1":
                    input1Ref.current.focus();
                    break;
                case "otp2":
                    input1Ref.current.focus();
                    break;
                case "otp3":
                    input2Ref.current.focus();
                    break;
                case "otp4":
                    input3Ref.current.focus();
                    break;
                case "otp5":
                    input4Ref.current.focus();
                    break;
                case "otp6":
                    input5Ref.current.focus();
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className="">
            <div className="h-screen">
                <div className="p-10 lg:w-1/2 mx-auto">
                    <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-24">
                        <p className="text-center text-sm text-gray-500 font-light">
                            <b>O T P</b> Validation
                        </p>
                        <form className="mt-6 flex flex-col" onSubmit={(e) => handleOTP(e)}>
                            <div className="mt-3 flex justify-center">
                                <input
                                    name="otp1"
                                    type="text"
                                    autoComplete="off"
                                    className="rounded border-1 p-2 text-center w-12 me-5"
                                    value={otp.input1}
                                    ref={input1Ref}
                                    onChange={handleChange}
                                    maxLength={1}
                                    onKeyUp={handleKeyUp}
                                />
                                <input
                                    name="otp2"
                                    type="text"
                                    autoComplete="off"
                                    className="rounded border-1 p-2 text-center w-12 me-5"
                                    value={otp.input2}
                                    ref={input2Ref}
                                    onChange={handleChange}
                                    maxLength={1}
                                    onKeyUp={handleKeyUp}
                                />
                                <input
                                    name="otp3"
                                    type="text"
                                    autoComplete="off"
                                    className="rounded border-1 p-2 text-center w-12 me-5"
                                    value={otp.input3}
                                    ref={input3Ref}
                                    onChange={handleChange}
                                    maxLength={1}
                                    onKeyUp={handleKeyUp}
                                />
                                <input
                                    name="otp4"
                                    type="text"
                                    autoComplete="off"
                                    className="rounded border-1 p-2 text-center w-12 me-5"
                                    value={otp.input4}
                                    ref={input4Ref}
                                    onChange={handleChange}
                                    maxLength={1}
                                    onKeyUp={handleKeyUp}
                                />
                                <input
                                    name="otp5"
                                    type="text"
                                    autoComplete="off"
                                    className="rounded border-1 p-2 text-center w-12 me-5"
                                    value={otp.input5}
                                    ref={input5Ref}
                                    onChange={handleChange}
                                    maxLength={1}
                                    onKeyUp={handleKeyUp}
                                />
                                <input
                                    name="otp6"
                                    type="text"
                                    autoComplete="off"
                                    className="rounded border-1 p-2 text-center w-12 me-5"
                                    value={otp.input6}
                                    ref={input6Ref}
                                    onChange={handleChange}
                                    maxLength={1}
                                    onKeyUp={handleKeyUp}
                                />
                            </div>
                            <div className="flex items-center justify-center mt-8">
                                <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                    Confirm
                                </button>
                            </div>
                        </form>
                        <div className="flex justify-between mt-5">
                            <p className="text-end text-sm text-gray-500 font-light">
                                OTP didn't come? <a className="text-green-400"> Try again</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtpComponent;
