// pages/Home.js
import React, { useEffect, useState } from "react";
import { db, ref, onValue } from "../firebase";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import UserGrowthChart from "../components/UserGrowthChart";
import jsPDF from "jspdf";

const Home = () => {
    const [userCount, setUserCount] = useState(0);
    const [blogPosts, setBlogPosts] = useState(0);
    const [userGrowth, setUserGrowth] = useState([]);

    useEffect(() => {
        fetchRealtimeData();
    }, []);

    const fetchRealtimeData = () => {
        const userRef = ref(db, "users");
        onValue(userRef, (snapshot) => {
            const users = snapshot.val();
            setUserCount(Object.keys(users || {}).length);
        });

        const blogRef = ref(db, "blogs");
        onValue(blogRef, (snapshot) => {
            const blogs = snapshot.val();
            setBlogPosts(Object.keys(blogs || {}).length);
        });

        const growthRef = ref(db, "userGrowth");
        onValue(growthRef, (snapshot) => {
            const growth = snapshot.val();
            const growthData = Object.keys(growth || {}).map((key) => growth[key]);
            setUserGrowth(growthData);
        });
    };

    const generatePDF = (type) => {
        const doc = new jsPDF();
        doc.text(`Report for ${type}`, 10, 10);
        doc.save(`${type}-report.pdf`);
    };

    return (
        <main style={{ flexGrow: 1, padding: "20px" }}>
            <Header />
            <section style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
                <StatCard label="Users" value={userCount} />
                <StatCard label="Blog Posts" value={blogPosts} />
            </section>
            <UserGrowthChart data={userGrowth} />
            <section style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
                <button onClick={() => generatePDF("Medication Usage Reports")} style={buttonStyle}>
                    Medication Usage Reports
                </button>
                <button onClick={() => generatePDF("Community Interaction Reports")} style={buttonStyle}>
                    Community Interaction Reports
                </button>
            </section>
        </main>
    );
};

const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#56A5E1",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

export default Home;
