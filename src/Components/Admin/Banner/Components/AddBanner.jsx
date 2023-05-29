import React, { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { AddBannerReqApi } from "../../../../API/Services/AdminRequest";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddBannerPage() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.adminLogin.token);
    const [title, setTitle] = useState(null);
    const [photo, setPhoto] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const base64 = (img) => {
        setImagePreview(URL.createObjectURL(img.target.files[0]));
        let reader = new FileReader();
        reader.readAsDataURL(img.target.files[0]);
        reader.onload = () => {
            setPhoto(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    const inputRef = useRef(null);
    const handleDelete = () => {
        setImagePreview(null);
        inputRef.current.value = null;
    };
    const handlePhotoAdd = async (e) => {
        e.preventDefault();
        if (title && photo) {
            const response = await AddBannerReqApi({ title: title, photo: photo }, token);
            if (response.status === 201) {
                navigate("/admin/banner");
                toast.success("Banner added");
            } else {
                toast.warn("Something went wrong try again!!");
            }
        } else {
            message.warning("Please fill the fields");
        }
    };

    return (
        <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-slate-700">
            <section id="contact" className="relative w-full min-h-screen bg-white text-lime-500">
                <h1 className="text-4xl p-4 font-bold tracking-wide">Add Banner</h1>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lime-600 h-32 w-full"></div>

                <div className="relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">
                    <div className="w-full md:w-1/2 p-5 md:px-0 mx-5">
                        <div className="bg-gray-200 border border-lime-500 w-full lg:w-4/5 h-fit p-5 pt-8">
                            <h3 className="text-2xl font-semibold mb-5">INSERT BANNER</h3>
                            <form onSubmit={handlePhotoAdd}>
                                <div className="flex flex-col mb-3">
                                    <label for="name">Title</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-red-500"
                                        autocomplete="off"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        name="banner"
                                        onChange={base64}
                                        className=" w-full bg-gray-800 border border-lime-500 focus:border-lime-500 focus:outline-none focus:bg-gray-800 focus:text-lime-500"
                                    />
                                </div>

                                <div onClick={handleDelete}>
                                    {imagePreview ? (
                                        <div className="flex  pb-4">
                                            <span className="font-bold uppercase text-xs">Delete</span>
                                            <MdDelete size={15} />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="text-sm w-full bg-gray-900 border border-lime-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-lime-500 hover:text-white cursor-pointer"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 border h-96 border-lime-500 p-2 bg-gray-200">
                        <h2 className="text-2xl pb-3 font-semibold cursor-pointer">IMAGE PREVIEW</h2>
                        {imagePreview && <img className="h-72 w-full" src={imagePreview && imagePreview} alt="banner" />}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddBannerPage;
