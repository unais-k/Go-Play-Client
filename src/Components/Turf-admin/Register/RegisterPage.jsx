import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCity, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsViewList } from "react-icons/bs";
import { AiFillIdcard, AiOutlineIdcard } from "react-icons/ai";
import { MdDelete, MdEmail } from "react-icons/md";
import { message } from "antd";
import { turfAdminRegister } from "../../../API/Services/authReq";
import Modal from "./SuccessModal";

function TurfAdminRegisterPage() {
    const navigate = useNavigate();

    const inputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [photo, setPhoto] = useState("");
    const [modal, setModal] = useState(false);
    const [profileImage, setProfileImage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        aadhar: "",
        place: "",
        pan: "",
        profile: "",
        password: "",
    });
    const regexp = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

    const handleLogin = () => {
        navigate("/turf-admin/login");
    };

    const base64 = (img) => {
        setProfileImage(img.target.files[0]);
        setImagePreview(URL.createObjectURL(img.target.files[0]));
        let reader = new FileReader();
        reader.readAsDataURL(img.target.files[0]);
        reader.onload = () => {
            setPhoto(reader.result);
            setFormData({ profile: reader.result });
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };
    const handleDelete = () => {
        setImagePreview(null);
        inputRef.current.value = null;
        setProfileImage(null);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            formData.name === "" ||
            formData.email === "" ||
            formData.phone === "" ||
            formData.aadhar === "" ||
            formData.place === "" ||
            formData.profile === "" ||
            formData.pan === "" ||
            formData.password === ""
        ) {
            message.error("All fields are required");
            return false;
        }
        if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            message.error("Invalid email address.");
            return false;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            message.error("Invalid phone number. Phone number must be 10 digits long.");
            return false;
        }
        if (!formData.aadhar.match(regexp)) {
            message.error("Enter correct aadhar number");
            return false;
        }
        console.log(formData);
        const response = await turfAdminRegister(formData);
        console.log(response, 111);
        if (response.status === 201) {
            message.success("Owner Created");
            setModal(true);
        }
    };
    return (
        <div>
            <div className="">
                <div className="flex justify-center h-fit">
                    <div className="p-10 lg:w-1/2 mx-auto">
                        <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-24">
                            <p className="text-center text-bold text-gray-500 font-admin font-light">
                                Sign Up For new Start
                            </p>
                            {modal && <Modal setModal={setModal} />}
                            <div className="flex justify-content-between h-32">
                                {/* Photo */}
                                <div className="relative pt-10">
                                    <input
                                        className="appearance-none border border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                        id="photo"
                                        ref={inputRef}
                                        onChange={base64}
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        type="file"
                                        name="profile"
                                    />
                                </div>
                                <div className="w-40">
                                    {imagePreview && (
                                        <img className="w-40 h-40" src={imagePreview && imagePreview} alt="ProfileImage" />
                                    )}
                                </div>
                            </div>
                            <div>
                                <div onClick={handleDelete}>
                                    {imagePreview ? (
                                        <div className="flex">
                                            <span>Delete Photo</span>
                                            <MdDelete size={23} />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <form className="mt-6" onSubmit={handleSubmit}>
                                <div className="relative">
                                    {/* user Name */}
                                    <input
                                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                        id="username"
                                        name="name"
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Enter your name"
                                    />
                                    <div className="absolute ms-4 inset-y-0 flex items-center">
                                        <FaUserAlt size={15} color="gray" />
                                    </div>
                                </div>
                                {/* email */}
                                <div className="relative mt-3">
                                    <input
                                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                        id="username"
                                        type="email"
                                        onChange={handleInputChange}
                                        name="email"
                                        placeholder="Enter your email"
                                    />

                                    <div className="absolute ms-4 inset-y-0 flex items-center">
                                        <MdEmail size={15} color="gray" />
                                    </div>
                                </div>
                                {/* phone */}
                                <div className="relative mt-3">
                                    <input
                                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        onChange={handleInputChange}
                                        name="phone"
                                        placeholder="Enter your mobile number"
                                    />

                                    <div className="absolute ms-4 inset-y-0 flex items-center">
                                        <FaPhoneAlt size={15} color="gray" />
                                    </div>
                                </div>
                                {/* place */}
                                <div className="relative mt-3">
                                    <input
                                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        onChange={handleInputChange}
                                        name="place"
                                        placeholder="Enter your Place"
                                    />

                                    <div className="absolute ms-4 inset-y-0 flex items-center">
                                        <FaCity size={15} color="gray" />
                                    </div>
                                </div>
                                {/* Aadhar */}
                                <div className="relative mt-3">
                                    <input
                                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        onChange={handleInputChange}
                                        name="aadhar"
                                        placeholder="Enter your aadhar number"
                                    />

                                    <div className="absolute ms-4 inset-y-0 flex items-center">
                                        <AiOutlineIdcard size={15} color="gray" />
                                    </div>
                                </div>
                                {/* Pan */}
                                <div className="relative mt-3">
                                    <input
                                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        onChange={handleInputChange}
                                        name="pan"
                                        placeholder="Enter your Pan number"
                                    />

                                    <div className="absolute ms-4 inset-y-0 flex items-center">
                                        <AiFillIdcard size={15} color="gray" />
                                    </div>
                                </div>

                                {/* password */}
                                <div className="relative mt-3">
                                    <input
                                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                                        id="username"
                                        name="password"
                                        onChange={handleInputChange}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <div className="absolute ms-4 inset-y-0 flex items-center">
                                        <RiLockPasswordFill size={15} color="gray" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center mt-8">
                                    <button className="text-white py-2 px-4 uppercase bg-amber-500 hover:bg-amber-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="text-end text-sm text-gray-500 font-light mt-5">
                                Already
                                <a className="text-green-400" onClick={handleLogin}>
                                    Login ?
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TurfAdminRegisterPage;
