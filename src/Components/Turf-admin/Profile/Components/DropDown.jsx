import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import { BsThreeDots } from "react-icons/bs";

const Popover = ({ setShowModal }) => {
    const [popoverShow, setPopoverShow] = React.useState(false);
    const btnRef = React.createRef();

    const popoverRef = React.createRef();
    const openPopover = () => {
        createPopper(btnRef.current, popoverRef.current, {
            placement: "bottom",
        });
        setPopoverShow(true);
    };
    const closePopover = () => {
        setPopoverShow(false);
    };

    const handleEdit = () => {
        setShowModal(true);
    };
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full text-center">
                    <button
                        type="button"
                        onClick={() => {
                            popoverShow ? closePopover() : openPopover();
                        }}
                        ref={btnRef}
                    >
                        <BsThreeDots color="white" size={25} />
                    </button>
                    <div className={(popoverShow ? "" : "hidden ") + "bg-white rounded"} ref={popoverRef}>
                        <div onClick={() => handleEdit()} className="text-dark p-3">
                            Edit Profile
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function PopoverRender({ setShowModal }) {
    return (
        <>
            <Popover setShowModal={setShowModal} />
        </>
    );
}
