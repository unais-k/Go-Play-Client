import React, { useEffect, useState } from "react";
import { LocationListReqApi } from "../../../API/Services/ClientRequest";

function ModalPage() {
    const [showModal, setShowModal] = React.useState(true);
    const [list, setList] = useState([]);
    useEffect(() => {
        cityListReq();
    }, [showModal]);

    const cityListReq = async () => {
        const response = await LocationListReqApi();
        if (response.status === 200) {
            setList(response.data.result);
        }
    };

    return (
        <div>
            <>
                <button
                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Open regular modal
                </button>
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 bg-gray-400  relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-center border-2 border-solid border-slate-200 bg-gray-300">
                                        <h3 className="text-3xl font-semibold ">Modal Title</h3>
                                    </div>

                                    <div className="relative p-6 ">
                                        {/* <AnimeList setFalse={setShowModal} /> */}
                                        Ivide modal open akkanm
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>
        </div>
    );
}

export default ModalPage;
