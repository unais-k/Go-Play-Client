import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

export function BarGraph({ barGraph }) {
    let monthlySales = [];
    let monthlyProfit = [];
    let dateData = [];
    console.log(barGraph);
    for (let i = 0; i < barGraph?.length; i++) {
        monthlySales.push(barGraph[i].totalPrice);
        monthlyProfit.push(barGraph[i].advance);
        dateData.push(barGraph[i]._id);
    }
    console.log(monthlySales);

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
    // const labels = [
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December",
    // ];

    const data = {
        labels,
        datasets: [
            {
                label: "Turf-Admin's Profit",
                // data: [10, 3, 6, 8, 5, 7, 3, 2, 4, 6, 3, 7],
                data: monthlySales,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Admin's Profit",
                // data: [3, 2, 4, 6, 3, 7, 10, 3, 6, 8, 5, 7],
                data: monthlyProfit,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
