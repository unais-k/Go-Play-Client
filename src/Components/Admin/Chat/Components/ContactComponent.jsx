import React, { useState } from "react";

function ContactComponent({ handleStartChat, conversation, socket, setCurrentChat }) {
    const [color, setColor] = useState(-1);

    return (
        <>
            {conversation?.map((res, i) => {
                return (
                    <span key={res._id}>
                        {res?.users[0]?.members[1] === res._id ? (
                            <div
                                onClick={() => {
                                    setCurrentChat(res.users[0]._id);
                                    setColor(res.users[0]._id);
                                    socket?.emit("join room", res.users[0]._id);
                                }}
                                className={`flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400 ${
                                    res.users[0]._id === color ? "bg-blue-400" : "bg-white"
                                }`}
                            >
                                <div className="w-1/4">
                                    <img src={res?.profile} className="object-cover h-12 w-12 rounded-full" alt="" />
                                </div>
                                <div className="w-full">
                                    <div className="text-lg font-semibold">{res?.name}</div>
                                    <span className="text-gray-500 text-xs"></span>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => handleStartChat(res._id)}
                                className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
                            >
                                <div className="w-1/4">
                                    <img src={res?.profile} className="object-cover h-12 w-12 rounded-full" alt="" />
                                </div>
                                <div className="w-full">
                                    <div className="text-lg font-semibold">{res?.name}</div>
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
