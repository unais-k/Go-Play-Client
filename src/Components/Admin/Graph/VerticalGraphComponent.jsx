import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
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

const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [10, 3, 6, 8, 5, 7, 3, 2, 4, 6, 3, 7],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: [3, 2, 4, 6, 3, 7, 10, 3, 6, 8, 5, 7],
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export function VerticalGraph() {
    return <Bar options={options} data={data} />;
}
