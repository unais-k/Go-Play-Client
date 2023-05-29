import React from "react";
import BannerCard from "./BannerCard";
import { useSelector } from "react-redux";
import { BannerFetchReqApi } from "../../../../API/Services/AdminRequest";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "./../../Layout/Loader";

function ViewPage() {
    const token = useSelector((state) => state.adminLogin.token);
    const [banner, setBanner] = useState([]);
    const [loader, setLoader] = useState(false);
    const fetchAll = async () => {
        setLoader(true);
        const response = await BannerFetchReqApi(token);
        console.log(response.data);
        if (response.status === 201) {
            setBanner(response.data.result);
            setLoader(false);
        }
    };
    useEffect(() => {
        if (token) {
            fetchAll();
        }
    }, [token]);
    console.log(banner, "banner");
    return (
        <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-slate-700 mx-auto px-20 pb-20 pt-10">
            {loader && <Loader />}
            <div className="">
                <BannerCard banner={banner} />
            </div>
        </div>
    );
}

export default ViewPage;
