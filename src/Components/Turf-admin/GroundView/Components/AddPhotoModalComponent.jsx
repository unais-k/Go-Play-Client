import React, { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AddPhotoOnGroundPostApi } from "../../../../API/Services/TurfAdminRequest";
import { useSelector } from "react-redux";
import { message } from "antd";

export default function AddPhotoModalComponent({ setModal, viewData }) {
    const token = useSelector((state) => state.turfAdminLogin.token);

    const [photo, setPhoto] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const inputRef = useRef(null);

    const base64 = (img) => {
        setProfileImage(img.target.files[0]);
        setImagePreview(URL.createObjectURL(img.target.files[0]));
        let reader = new FileReader();
        reader.readAsDataURL(img.target.files[0]);
        reader.onload = () => {
            setPhoto(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error: line 24 ", error);
        };
    };

    const handleDelete = () => {
        setImagePreview(null);
        inputRef.current.value = null;
        setProfileImage(null);
    };

    const handlePhotoAdd = async (e) => {
        e.preventDefault();
        const response = AddPhotoOnGroundPostApi(
            {
                photo: photo,
                groundId: viewData._id,
            },
            token
        );
        if (response.status === 201) {
            message.success("Photo added");
            setModal(false);
        }
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto mt-6 mb-3 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="relative pt-6 pb-3 px-6 flex-auto">
                            <form onSubmit={handlePhotoAdd}>
                                <div class="mb-4 w-full">
                                    <div className="">
                                        <label class="block text-gray-700 font-bold mb-2" for="company_name">
                                            Add Photo
                                        </label>
                                        <input
                                            class="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="company_name"
                                            name="picturePath"
                                            ref={inputRef}
                                            onChange={base64}
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            type="file"
                                            placeholder="Enter your company name"
                                        />
                                    </div>

                                    <div className="h-28 w-52 mx-auto mt-3">
                                        {imagePreview && <img src={imagePreview} alt="ProfileImage" />}
                                    </div>
                                </div>
                                <div onClick={handleDelete}>
                                    {imagePreview ? (
                                        <div className="flex">
                                            <span>Delete Photo</span>
                                            <MdDelete size={20} />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-400 mt-2 text-white font-bold uppercase p-2 rounded"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
