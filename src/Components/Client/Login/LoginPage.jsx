import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../Utils/Store/Slice/Client";
import { FormValidate } from "../../../Utils/Helpers/FormValidate";
import { userLogin } from "../../../API/Services/authReq";
import { message } from "antd";

function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    const validateForm = () => {
        const newErrors = FormValidate(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const submit = async (res) => {
        const resp = await userLogin(res).then((response) => {
            if (response?.status === 401) message.warning("Login credential error");
            else if (response?.status === 200) {
                console.log(response.data);
                const token = response.data.token;
                const name = response.data.name;
                message.success(`${name} Welcome`);
                dispatch(setLogin({ token: token, name: name, id: response.data.id }));
                navigate("/");
            } else if (response?.status === 500) message.error(response.data.error);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        submit(formData);
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleForgetPassword = () => {
        navigate("/forget_password");
    };

    return (
        <div className="">
            <div className=" h-screen">
                <div className="p-10 lg:w-1/2 mx-auto">
                    <div className="bg-lime-200 rounded-t-lg p-8">
                        <div>
                            <p className="text-center text-xl text-dark font-light">ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ɢᴏ-ᴘʟᴀʏ</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                        <p className="text-center text-sm text-gray-500 font-light"> sign in with credentials </p>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="relative mt-3">
                                <input
                                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                    id="username"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    type="text"
                                    placeholder="Email"
                                />
                                {errors.email && <p className="text-red-500 mt-1 text-xs italic"> {errors.email}</p>}
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
                            <div className="relative mt-3">
                                <input
                                    className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                    id="username"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                {errors.password && <p className="text-red-500 mt-1 text-xs italic"> {errors.password}</p>}
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
                            <div className="flex items-center justify-center mt-8">
                                <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="flex justify-between mt-5">
                            <p className="text-start text-sm text-gray-500 font-light">
                                <a className="text-green-400" onClick={handleForgetPassword}>
                                    Forget Password
                                </a>
                            </p>
                            <p className="text-end text-sm text-gray-500 font-light">
                                New to Go Play?
                                <a className="text-green-400" onClick={handleRegister}>
                                    &nbsp;Register
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
