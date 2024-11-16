// components/StatCard.js
import React from "react";

const StatCard = ({ label, value }) => {
    return (
        <div style={{ flex: 1, background: "#f9fafb", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
            <h2>{value}</h2>
            <p>{label}</p>
        </div>
    );
};

export default StatCard;
