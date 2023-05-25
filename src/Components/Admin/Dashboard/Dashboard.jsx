import React from "react";
import DashCardComponent from "./Components/DashCardComponent";
import { VerticalGraph } from "../Graph/VerticalGraphComponent";
import { PieGraph } from "../Graph/PieGraphComponent";

function DashboardPageAdmin() {
    return (
        <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-slate-700">
            <DashCardComponent />
            <div className="mt-12">
                <div className=" grid gap-10 grid-cols-1 lg:grid-cols-2">
                    <div className="bg-white shadow-lg">{<VerticalGraph />}</div>
                    <div className="bg-white h-96 w-96 shadow-lg">{<PieGraph />}</div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPageAdmin;
