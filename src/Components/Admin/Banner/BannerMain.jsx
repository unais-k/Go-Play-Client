import React from "react";
import ViewPage from "./Components/ViewPage";
import { useNavigate } from "react-router-dom";

function BannerMain() {
    const navigate = useNavigate();

    const handleAddBanner = () => {
        navigate("/admin/add-banner");
    };
    return (
        <div className="">
            <div onClick={handleAddBanner} className="px-3 py-2 bg-amber-500 rounded w-fit">
                <span className="text-dark uppercase font-semibold text-sm">Add Banner</span>
            </div>
            <ViewPage />
        </div>
    );
}

export default BannerMain;
