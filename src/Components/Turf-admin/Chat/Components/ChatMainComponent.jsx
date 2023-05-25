import React, { useEffect, useRef, useState } from "react";
import ContactComponent from "./ContactComponent";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Picker from "emoji-picker-react";

import { AddMessageReqApi, GetFullMessagesReqApi } from "../../../../API/Services/ConversationRequest";
import MessageComponent from "../../../Admin/Chat/Components/MessageComponent";
var socket;

function ChatMainComponent() {
    const id = useSelector((state) => state.turfAdminLogin.id);
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [newMessage, setNewMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [socketId, setSocketId] = useState(false);
    const [message, setMessage] = useState([]);
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
    const [loader, setLoader] = useState(false);

    const scrollRef = useRef();
    const PORT = "http://localhost:4001";
    socket = io(PORT);

    const getMessages = async () => {
        const response = await GetFullMessagesReqApi(currentChat, token);

        setMessage(response.data.result);
    };

    const handleEmojiPickerToggle = () => {
        setIsEmojiPickerVisible(!isEmojiPickerVisible);
    };

    const handleEmojiClick = (emojiObject) => {
        setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const msg = {
            text: newMessage,
            sender: id,
            conversationId: currentChat,
        };

        const response = await AddMessageReqApi(msg, token);
        if (response.status === 201) {
            console.log(message, "add message");
            setMessage([...message, response.data.result]);
            setNewMessage("");
            socket.emit("send_message", response.data.result);
            setNewMessage("");
        }
    };

    useEffect(() => {
        scrollRef?.current?.scrollIntoView();
    }, [message]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data?.conversationId === currentChat) {
                // const mess = [...message, data];
                // setMessage(mess);
                getMessages();
            }
        });
    });

    useEffect(() => {
        socket?.emit("setup", currentChat);
        socket?.on("connection", () => {
            setSocketId(true);
        });
        socket?.on("connected", () => {
            setSocketId(true);
        });
    }, [currentChat]);

    useEffect(() => {
        if (currentChat) getMessages();
    }, [currentChat]);

    return (
        <div>
            <div className="container w-full mx-auto shadow-lg border-t rounded-lg">
                <div className="flex w-full h-screen bg-white">
                    <div className="flex pt-20 flex-col w-2/6 border-r-2 overflow-y-auto">
                        <div className="border-b-2 mb-2 py-4 px-2">
                            <input
                                type="text"
                                placeholder="search chatting"
                                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                            />
                        </div>
                        <ContactComponent socket={socket} setCurrentChat={setCurrentChat} />
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
                                                strokeLinecap="round"
                                                stroke-linejoin="round"
                                                strokeWidth="2"
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
                                        <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    stroke-linejoin="round"
                                                    strokeWidth="2"
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
                                                    strokeLinecap="round"
                                                    stroke-linejoin="round"
                                                    strokeWidth="2"
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

export default ChatMainComponent;
