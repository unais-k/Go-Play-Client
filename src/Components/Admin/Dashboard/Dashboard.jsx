import React, { useEffect, useState } from "react";
import DashCardComponent from "./Components/DashCardComponent";
import { BarGraph } from "../Graph/VerticalGraphComponent";
import { PieGraph } from "../Graph/PieGraphComponent";
import { useSelector } from "react-redux";
import { AdminHomePageReqApi } from "../../../API/Services/AdminRequest";

function DashboardPageAdmin() {
    const token = useSelector((state) => state.adminLogin.token);
    const [loader, setLoader] = useState(false);
    const [pieChart, setPieChart] = useState(null);
    const [barGraph, setBarGraph] = useState(null);
    const [totalCustomer, setTotalCustomer] = useState(null);
    const [totalProfit, setTotalProfit] = useState(null);
    const [totalBooking, setTotalBooking] = useState(null);
    const adminHome = async () => {
        const response = await AdminHomePageReqApi(token);
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
        if (token) adminHome();
    }, [token]);
    return (
        <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-slate-700">
            <DashCardComponent totalBooking={totalBooking} totalCustomer={totalCustomer} totalProfit={totalProfit} />
            <div className="mt-12">
                <div className=" grid gap-10 grid-cols-1 lg:grid-cols-2">
                    <div className="bg-white shadow-lg">{<BarGraph barGraph={barGraph} />}</div>
                    <div className="flex justify-center w-full">
                        <div className="bg-white h-96 w-96 shadow-lg">{<PieGraph saleReport={pieChart} />}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPageAdmin;
