import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export function PieGraph({ saleReport }) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    let labels = [];
    let DonutData = [];

    for (let i = 0; i < saleReport?.length; i++) {
        labels.push(saleReport[i]._id);
        DonutData.push(saleReport[i].count);
    }

    const data = {
        labels: labels,
        // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                label: "# of Votes",
                data: DonutData,
                // data: [12, 19, 3, 5, 2, 3],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} />;
}
