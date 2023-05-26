import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

export function BarGraph({ barGraph }) {
    let monthlySales = [];
    let monthlyProfit = [];
    let dateData = [];

    for (let i = 0; i < barGraph?.length; i++) {
        monthlySales.push(barGraph[i].totalPrice);
        monthlyProfit.push((barGraph[i].totalPrice * 10) / 100);
        dateData.push(barGraph[i]._id);
    }

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Chart.js Bar Chart",
            },
        },
    };

    const labels = dateData;
    // const labels = ["January", "February", "March", "April", "May", "June", "July"];

    const data = {
        labels,
        datasets: [
            {
                label: "Monthly Sale",
                // data: [5, 8, 7, 6],
                data: monthlySales,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Monthly Profit",
                // data: [5, 8, 7, 6],
                data: monthlyProfit,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
