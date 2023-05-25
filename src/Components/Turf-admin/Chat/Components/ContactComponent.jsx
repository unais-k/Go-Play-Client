import React, { useEffect, useState } from "react";
import { AdminPermissionReqApi, GetAdminListReqApi } from "../../../../API/Services/ConversationRequest";
import { useSelector } from "react-redux";
import { message } from "antd";
import RequestModal from "./ReqModal";
import Loader from "../../Layout/Loader";

function ContactComponent({ setCurrentChat, socket }) {
    const id = useSelector((state) => state.turfAdminLogin.id);
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [conversation, setConversation] = useState([]);
    const [reqModal, setReqModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const conversationList = async () => {
        setLoader(true);
        const response = await GetAdminListReqApi(token);
        setConversation([response.data.result]);
        setLoader(false);
    };

    const handleStartChat = async (id) => {
        setLoader(true);
        const response = await AdminPermissionReqApi(token);
        if (response.status === 201) {
            message.success("Request send");
            setLoader(false);
        }
        if (response.status === 203) {
            setLoader(false);
            setReqModal((state) => !state);
        }
        if (response.status === 202) {
            setCurrentChat(id);
            setLoader(false);
        }
    };

    useEffect(() => {
        if (token) conversationList();
    }, [token]);

    return (
        <>
            {conversation.length > 0 &&
                conversation?.map((res) => {
                    return (
                        <span key={res?._id}>
                            {res?.members[1] === id ? (
                                <div
                                    onClick={() => {
                                        setCurrentChat(res._id);
                                        socket?.emit("join room", res._id);
                                    }}
                                    className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
                                >
                                    <div className="w-1/4">
                                        <img
                                            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                            className="object-cover h-12 w-12 rounded-full"
                                            alt=""
                                        />
                                    </div>
                                    {loader && <Loader />}
                                    <div className="w-full">
                                        <div className="text-lg font-semibold">Admin</div>
                                        <span className="text-gray-500 text-xs"></span>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => handleStartChat(id)}
                                    className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
                                >
                                    <div className="w-1/4">
                                        <img
                                            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                            className="object-cover h-12 w-12 rounded-full"
                                            alt=""
                                        />
                                    </div>
                                    <div>{reqModal && <RequestModal />}</div>
                                    <div className="w-full">
                                        <div className="text-lg font-semibold">Admin</div>
                                        <span className="text-gray-500 text-xs">Start Chat by Taping</span>
                                    </div>
                                </div>
                            )}
                        </span>
                    );
                })}
        </>
    );
}

export default ContactComponent;
