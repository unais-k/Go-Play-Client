import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { message } from "antd";
import { addGroundReqApi } from "../../../API/Services/TurfAdminRequest";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { findCityReqApi } from "../../../API/Services/TurfAdminRequest";
import Loader from "../Layout/Loader";

function AddGroundPage() {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const navigate = useNavigate();
    const [list, setList] = useState([]);

    const [loader, setLoader] = useState(false);

    const [formData, setFormData] = useState({
        picturePath: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        nearCity: "",
        place: "",
        pinCode: "",
        state: "",
    });
    const findCity = async () => {
        await findCityReqApi(token).then(async (response) => {
            console.log(response, "response");
            console.log(response.data);
            if (response.status === 200) {
                setList(response.data.result);
            } else {
                message.error("Something went wrong find");
            }
        });
    };
    useEffect(() => {
        findCity();
    }, []);
    const type = [{ name: "Turf" }, { name: "Soapy" }, { name: "Grass" }, { name: "Sand" }, { name: "Court" }];
    const size = [
        { name: "5 * 5" },
        { name: "6 * 6" },
        { name: "7 * 7" },
        { name: "8 * 8" },
        { name: "10 * 10" },
        { name: "11 * 11" },
    ];

    const base64 = (img) => {
        setProfileImage(img.target.files[0]);
        setImagePreview(URL.createObjectURL(img.target.files[0]));
        let reader = new FileReader();
        reader.readAsDataURL(img.target.files[0]);
        reader.onload = () => {
            setFormData({ ...formData, picturePath: reader.result });
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    const [profileImage, setProfileImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const inputRef = useRef(null);
    const handleDelete = () => {
        setImagePreview(null);
        inputRef.current.value = null;
        setProfileImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (
            formData.picturePath === "" ||
            formData.name === "" ||
            formData.nearCity === "" ||
            formData.email === "" ||
            formData.phone === "" ||
            formData.pinCode === "" ||
            formData.address === "" ||
            formData.place === ""
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

        const response = await addGroundReqApi(formData, token);
        if (response.status === 200) {
            setLoader(false);
            navigate("/turf-admin/ground-list");

            message.success("New Ground added");
        } else {
            message.error("Something went wrong");
        }
    };

    return (
        <div>
            <div>
                <h2 className="text-center text-3xl m-3 text-groundAdd">Start a new Venue</h2>
            </div>
            <div className="container mx-auto w-8/12">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4 flex">
                        <div className="w-8/12 h-1/12">
                            <label className="block text-gray-700 font-bold mb-2" for="company_name">
                                Profile Photo
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="company_name"
                                name="picturePath"
                                ref={inputRef}
                                onChange={base64}
                                acceptedFiles=".jpg,.jpeg,.png"
                                type="file"
                                placeholder="Enter your company name"
                            />
                        </div>
                        <div className="h-40 w-40">
                            {imagePreview && <img src={imagePreview && imagePreview} alt="ProfileImage" />}
                        </div>
                    </div>
                    <div onClick={handleDelete}>{imagePreview ? <MdDelete /> : ""}</div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" for="company_name">
                            Full Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id=""
                            name="name"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Enter your company name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" for="email">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            onChange={handleInputChange}
                            type="email"
                            placeholder="Enter company email address"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" for="Phone">
                            Phone
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            onChange={handleInputChange}
                            name="phone"
                            placeholder="Enter your Dial number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" for="address">
                            Address
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            onChange={handleInputChange}
                            name="address"
                            placeholder="Enter your Turf's address"
                        ></textarea>
                    </div>
                    <div className="flex justify-between w-full mb-4">
                        <div className="me-2 basis-1/2">
                            <label className="block text-gray-700 font-bold mb-2" for="phone_number">
                                Nearest City
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="nearCity"
                                onChange={handleInputChange}
                                placeholder="Enter your Nearest City"
                            >
                                <option value="">Choose One City</option>
                                {list.map((res) => {
                                    return <option value={res.City}>{res.City}</option>;
                                })}
                            </select>
                        </div>
                        <div className="ms-2 basis-1/2">
                            <label className="block text-gray-700 font-bold mb-2" for="Phone">
                                pin code
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="text"
                                onChange={handleInputChange}
                                name="pinCode"
                                placeholder="Enter your pin code"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" for="phone_number">
                            Place
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            onChange={handleInputChange}
                            name="place"
                            placeholder="Enter company Place"
                        ></input>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" for="confirm_password">
                            State
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="text"
                            onChange={handleInputChange}
                            name="state"
                            placeholder="Enter your State"
                        />
                    </div>

                    <div>
                        {loader ? (
                            <Loader />
                        ) : (
                            <button className="bg-black text-white rounded py-2 px-4 m-3" type="submit">
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddGroundPage;
