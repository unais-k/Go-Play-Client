import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatRequestReqApi, notificationReqApi, turfAdminApproveReq } from "../../../API/Services/AdminRequest";
import { message } from "antd";
import InboxPage from "./Components/InboxPage";
import ChatReqComponent from "./Components/ChatReqComponent";
import Loader from "../Layout/Loader";
import { NewConversationReqApi } from "../../../API/Services/ConversationRequest";
import { useNavigate } from "react-router-dom";

function InboxMain() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
    const token = useSelector((state) => state.adminLogin.token);
    const [data, setData] = useState([]);

    const getUser = async () => {
        setLoader(true);
        await notificationReqApi(token)
            .then((data) => {
                setList(data.data.result);
                setLoader(false);
            })
            .catch((err) => console.log(err));
    };

    const details = async () => {
        setLoader(true);
        const response = await ChatRequestReqApi(token);
        if (response.status === 201) {
            setData(response.data.result);
            setLoader(false);
        }
    };

    useEffect(() => {
        getUser();
    }, [list && ""]);
    useEffect(() => {
        if (token) details();
    }, [token]);

    const handleApprove = async (e) => {
        const response = await turfAdminApproveReq(e, token);

        if (response.status === 200) {
            await getUser();
            message.success(`You have approved ${response.data.name}`);
        } else {
            message.error("Something went wrong");
        }
    };

    const handleCancel = async (e) => {
        const response = await turfAdminApproveReq(e, token);

        if (response.status === 200) {
            await getUser();
            message.warning(`You have canceled ${response.data.name}`);
        } else {
            message.error("Something went wrong");
        }
    };

    const handleApproveChat = async (e) => {
        const response = await NewConversationReqApi(e, token);
        if (response.status === 201) navigate("/admin/chat");
    };

    return (
        <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-slate-700">
            {data.length > 0 && list.length > 0 ? (
                <>
                    <div>
                        {loader && <Loader />}
                        {list?.length > 0 ? (
                            <h1 className="w-full mx-4 my-3 font-normal text-2xl font-heading uppercase">Notification</h1>
                        ) : (
                            <div className="text-2xl">No New Notification</div>
                        )}
                    </div>

                    {list?.map((res) => {
                        return (
                            <div key={res._id}>
                                <InboxPage handleApprove={handleApprove} handleCancel={handleCancel} list={res} />
                            </div>
                        );
                    })}
                    {data?.length > 0 ? (
                        <div>
                            <h1 className="w-full mx-4 my-3 font-normal text-2xl font-heading uppercase">Chat Request</h1>
                        </div>
                    ) : (
                        <div className="text-2xl">No New Chat request</div>
                    )}

                    {data?.map((res) => {
                        return (
                            <div className="mb-32" key={res._id}>
                                <ChatReqComponent handleApproveChat={handleApproveChat} han data={res} />
                            </div>
                        );
                    })}
                </>
            ) : (
                <div className="text-2xl uppercase font-semibold">NO New NOtification</div>
            )}
        </div>
    );
}

export default InboxMain;
