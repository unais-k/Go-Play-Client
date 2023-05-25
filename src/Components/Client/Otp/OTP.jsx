import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { otpVerify, userRegister } from "../../../API/Services/authReq";
import { message } from "antd";
import { toast } from "react-toastify";

function OtpPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phone: "",
        name: "",
        email: "",
        password: "",
    });
    const [otp, setOtp] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: "",
    });

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);

    useEffect(() => {
        setFormData({
            email: location.state.email,
            name: location.state.name,
            phone: location.state.phone,
            password: location.state.password,
        });
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = Object.values(otp);
        const otpValue = values.join("");
        const phone = formData.phone;
        const response = otpVerify({ otpValue, phone }).then(async (res) => {
            if (res.status === 200) {
                const data = await userRegister(formData);
                if (data.status === 201) navigate("/login");
                else if (data.status === 500) toast.warning(data.data.error);
            } else if (res.status === 400) message.warning("Something went wrong");
            else if (res.status === 500) toast.warning(res.data.error);
        });
    };

    return (
        <div className="">
            <div className="bg-gray-300 h-screen">
                <div className="p-10 lg:w-1/2 mx-auto">
                    <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-24 mt-20">
                        <p className="text-center text-sm text-gray-500 font-light">
                            <b>O T P</b> Validation
                        </p>
                        <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
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

export default OtpPage;
