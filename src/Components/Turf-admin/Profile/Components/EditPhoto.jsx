import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { EditProfilePhotoReqApi } from "../../../../API/Services/TurfAdminRequest";
import { message } from "antd";
import { MdDelete } from "react-icons/md";

function EditPhoto({ setShowModal }) {
    const token = useSelector((state) => state.turfAdminLogin.token);

    const [photo, setPhoto] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const base64 = (img) => {
        setProfileImage(img.target.files[0]);
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
    const [imagePreview, setImagePreview] = useState(null);
    const handleDelete = () => {
        setImagePreview(null);
        inputRef.current.value = null;
        setProfileImage(null);
    };

    const handlePhotoAdd = async (e) => {
        e.preventDefault();
        const response = EditProfilePhotoReqApi(
            {
                photo: photo,
            },
            token
        );
        if (response.status === 201) {
            message.success("Photo Edited");
            setShowModal(false);
        }
    };
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Add Photo</h3>
                        </div>

                        <div className="relative p-6 flex-auto">
                            <form onSubmit={handlePhotoAdd}>
                                <div class="mb-4 flex">
                                    <div className="">
                                        <label class="block text-gray-700 font-bold mb-2" for="company_name">
                                            Photo
                                        </label>
                                        <input
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                <div onClick={handleDelete}>
                                    {imagePreview ? (
                                        <div>
                                            <span>Delete Photo</span>
                                            <MdDelete />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <button type="submit" className="bg-green-400 text-white font-bold uppercase p-2 rounded">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
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

export default EditPhoto;
