import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { otpSend } from "../../../API/Services/authReq.js";
import { errorSwal } from "../../../Utils/Helpers/Swal";
import { message } from "antd";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [apiError, setApiError] = useState();

    const [toast, setToast] = useState({
        email: "",
        phone: "",
    });

    const handleLogin = () => {
        navigate("/login");
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setToast({ email: "", phone: "" });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            message.error("Invalid email address.");
            return false;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            message.error("Invalid phone number. Phone number must be 10 digits long.");
            return false;
        }
        // navigate("/otp");
        const res = otpSend({
            formData,
        }).then((response) => {
            if (response.status === 200) {
                const phone = response.data.phone;
                const email = response.data.email;
                const password = response.data.password;
                const name = response.data.name;
                message.success(`OTP sent to ${phone}`);
                navigate("/otp", { state: { phone: phone, email: email, name: name, password: password } });
            } else if (response.status === 406) {
                message.warning("Something went wrong");
            } else if (response.status === 500) errorSwal(response.data.error);
        });
    };
    return (
        <div>
            <div className="flex justify-center h-screen">
                <div className="p-10 lg:w-1/2 mx-auto">
                    <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-24">
                        <p className="text-center text-sm text-gray-500 font-light"> Sign Up Champ! </p>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="relative">
                                {/* user Name */}
                                <input
                                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                    id="username"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter your name"
                                />
                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 ml-3 text-gray-400 p-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        {/* <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /> */}
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                            </div>
                            {/* email */}
                            <div className="relative mt-3">
                                <input
                                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                    id="username"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    name="email"
                                    placeholder="Email"
                                />
                                <span>{toast.email}</span>
                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 ml-3 text-gray-400 p-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                            </div>
                            {/* phone */}
                            <div className="relative mt-3">
                                <input
                                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    name="phone"
                                    placeholder="Enter you mobile number"
                                />
                                <span>{toast.phone}</span>
                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="h-7 w-7 ml-3 text-gray-400 p-1"
                                        fill="currentColor"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                            </div>
                            {/* password */}
                            <div className="relative mt-3">
                                <input
                                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                    id="username"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    type="password"
                                    placeholder="Password"
                                />
                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 ml-3 text-gray-400 p-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex p-0 m-0 justify-center text-red-500 text-xs italic"> {apiError}</div>
                            <div className="flex items-center justify-center mt-8">
                                <button className="text-white py-2 px-4 uppercase bg-amber-500 hover:bg-indigo-600 shadow font-medium transition transform hover:-translate-y-0.5">
                                    Register
                                </button>
                            </div>
                        </form>

                        <p className="text-end text-sm text-gray-500 font-light mt-5">
                            Already
                            <a className="text-green-400" onClick={handleLogin}>
                                &nbsp;Login ?
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
