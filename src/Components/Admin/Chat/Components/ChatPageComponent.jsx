import React, { useEffect, useRef, useState } from "react";
import ContactComponent from "./ContactComponent";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Picker from "emoji-picker-react";

import {
    AddMessageReqApi,
    GetConversationListReqApi,
    GetConversationReqApi,
    GetFullMessagesReqApi,
    NewConversationReqApi,
} from "../../../../API/Services/ConversationRequest";
import MessageComponent from "./MessageComponent";
import { toast } from "react-toastify";
import Loader from "./Loader";

var socket;
function ChatPageComponent() {
    const id = useSelector((state) => state.adminLogin.id);

    const token = useSelector((state) => state.adminLogin.token);
    const [conversation, setConversation] = useState([]);
    const [conversationId, setConversationId] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [socketId, setSocketId] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState([]);
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);

    const scrollRef = useRef();

    const conversationList = async () => {
        setLoader(true);
        const response = await GetConversationListReqApi(token);
        if (response.status === 201) {
            setLoader(false);
            setConversation(response.data.result);
        }
    };

    const getChat = async () => {
        const response = await GetConversationReqApi(id, token);
        setConversationId(response.data.result);
    };

    const PORT = "http://localhost:4001";

    const getMessages = async () => {
        const response = await GetFullMessagesReqApi(currentChat, token);
        setMessage(response.data.result);
    };

    socket = io(PORT);

    useEffect(() => {
        if (token) {
            getChat();
            conversationList();
        }
    }, [token]);

    useEffect(() => {
        socket?.emit("setup", currentChat);
        socket?.on("connection", () => {
            // setSocketId(true);
        });
        socket?.on("connected", () => {
            // setSocketId(true);
        });
    }, [currentChat]);

    useEffect(() => {
        scrollRef?.current?.scrollIntoView();
    }, [message]);

    useEffect(() => {
        if (currentChat) getMessages();
    }, [currentChat]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data?.conversationId === currentChat) {
                getMessages();
            }
        });
    });
    const handleEmojiPickerToggle = () => {
        setIsEmojiPickerVisible(!isEmojiPickerVisible);
    };

    const handleEmojiClick = (emojiObject) => {
        setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    const handleStartChat = async (id) => {
        const response = await NewConversationReqApi({ id: id }, token);
        setCurrentChat(response?.data.result._id);
        await conversationList();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentChat) {
            toast.warning("Select a Person to start");
        }
        if (newMessage.length > 0) {
            const msg = {
                sender: id,
                text: newMessage,
                conversationId: currentChat,
            };

            const response = await AddMessageReqApi(msg, token);

            if (response.status === 201) {
                setMessage([...message, response.data.result]);
                setNewMessage("");
                socket.emit("send_message", response.data.result);
                setNewMessage("");
            }
        } else {
            toast.error("empty text cannot be send");
        }
    };

    return (
        <div>
            <div className="container w-full mx-auto shadow-lg border-t rounded-lg">
                <div className="flex flex-row h-screen justify-between bg-white">
                    <div className="flex pt-20 flex-col w-2/6 border-r-2 overflow-y-auto">
                        <div className="border-b-2 mb-2 py-4 px-2">
                            <input
                                type="text"
                                placeholder="search chatting"
                                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                            />
                        </div>
                        {loader ? (
                            <div className="flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <ContactComponent
                                setCurrentChat={setCurrentChat}
                                socket={socket}
                                conversation={conversation}
                                handleStartChat={handleStartChat}
                            />
                        )}
                    </div>

                    <div className="flex flex-col w-full flex-auto h-full p-6">
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                            <div className="flex flex-col h-full overflow-x-auto mb-4">
                                <div className="flex flex-col h-full">
                                    <div className="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
                                        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                                            {message?.map((res) => {
                                                return (
                                                    <div key={res._id} ref={scrollRef}>
                                                        <MessageComponent message={res} own={res.sender === id} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                <div>
                                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex-grow ml-4">
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                        />
                                        <button
                                            onClick={handleEmojiPickerToggle}
                                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                        >
                                            {isEmojiPickerVisible && (
                                                <div
                                                    style={{
                                                        zIndex: 99,
                                                        position: "absolute",
                                                        right: "107px",
                                                        bottom: "50px",
                                                    }}
                                                >
                                                    <Picker
                                                        style={{ height: "200px", width: "100%" }}
                                                        className="emojiPicker"
                                                        onEmojiClick={handleEmojiClick}
                                                    />
                                                </div>
                                            )}
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                    >
                                        <span>Send</span>
                                        <span className="ml-2">
                                            <svg
                                                className="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPageComponent;
