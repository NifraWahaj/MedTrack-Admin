// components/UserGrowthChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserGrowthChart = ({ data }) => {
    const graphData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "User Growth",
                data: data.map((item) => item.count),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    return (
        <div style={{ background: "#f9fafb", padding: "20px", borderRadius: "8px" }}>
            <h2>User Growth</h2>
            <Bar data={graphData} />
        </div>
    );
};

export default UserGrowthChart;
