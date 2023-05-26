import React, { useState } from "react";
import { BarGraph } from "../Graph/StackedComponent";
import DashCardComponent from "./Components/DashCardComponent";
import { PieChart } from "../Graph/DonutComponent";
import Loader from "../Layout/Loader";
import { useSelector } from "react-redux";
import { AdminHomePageReqApi } from "../../../API/Services/TurfAdminRequest";
import { useEffect } from "react";

function TurfHomePage() {
    const token = useSelector((state) => state.turfAdminLogin.token);
    const [loader, setLoader] = useState(false);
    const [pieChart, setPieChart] = useState(null);
    const [barGraph, setBarGraph] = useState(null);
    const [totalCustomer, setTotalCustomer] = useState(null);
    const [totalProfit, setTotalProfit] = useState(null);
    const [totalBooking, setTotalBooking] = useState(null);

    const adminPage = async () => {
        const response = await AdminHomePageReqApi(token);
        // console.log(response.data);
        const res = response.data;
        if (response.status === 201) {
            setPieChart(res.pieChart);
            setBarGraph(res.barGraph);
            setTotalBooking(res.totalBooking);
            setTotalCustomer(res.totalCustomer);
            setTotalProfit(res.totalProfit);
        }
    };
    useEffect(() => {
        if (token) adminPage();
    }, [token]);
    return (
        <div className="m-5">
            <DashCardComponent totalBooking={totalBooking} totalCustomer={totalCustomer} totalProfit={totalProfit} />
            {loader && <Loader />}
            <div className="mt-12">
                <div className=" grid gap-10 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="bg-white w-full shadow-lg">{<BarGraph barGraph={barGraph} />}</div>
                    <div className="bg-white h-96 w-96 shadow-lg">{<PieChart saleReport={pieChart} />}</div>
                </div>
            </div>
        </div>
    );
}

export default TurfHomePage;
