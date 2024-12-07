import React, { useEffect, useState } from "react";
import { db, ref, onValue } from "../firebase";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jsPDF AutoTable plugin for table support
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

const Home = () => {
    const [userCount, setUserCount] = useState(0);
    const [blogPosts, setBlogPosts] = useState(0);
    const [medicationFrequency, setMedicationFrequency] = useState({});
    const [userNames, setUserNames] = useState({});
    const [blogData, setBlogData] = useState({});

    useEffect(() => {
        fetchRealtimeData();
    }, []);

    const fetchRealtimeData = () => {
        // Fetch user count
        const userRef = ref(db, "users");
        onValue(userRef, (snapshot) => {
            const users = snapshot.val();
            if (users) {
                setUserCount(Object.keys(users).length);
                const names = {};
                Object.keys(users).forEach((userId) => {
                    names[userId] = users[userId].name || `User ${userId}`;
                });
                setUserNames(names);
            }
        });

        // Fetch blog post count and blog data
        const blogRef = ref(db, "blogs");
        onValue(blogRef, (snapshot) => {
            const blogs = snapshot.val();
            setBlogPosts(Object.keys(blogs || {}).length);
            setBlogData(blogs || {});
        });

        // Fetch medication data
        const medRef = ref(db, "medications");
        onValue(medRef, (snapshot) => {
            const medications = snapshot.val();
            const frequencyMap = {};

            if (medications) {
                Object.keys(medications).forEach((userId) => {
                    const userMeds = medications[userId];

                    Object.values(userMeds).forEach((med) => {
                        if (med.name) {
                            if (frequencyMap[med.name]) {
                                frequencyMap[med.name]++;
                            } else {
                                frequencyMap[med.name] = 1;
                            }
                        }
                    });
                });
            }

            setMedicationFrequency(frequencyMap);
        });
    };

    const generatePDF = (type) => {
        const doc = new jsPDF();
        const marginX = 15;
        let currentY = 30;

        if (type === "Medication Usage Reports") {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Medication Usage Report", 105, 20, { align: "center" });

            doc.setFontSize(14);
            doc.text("Summary", marginX, currentY);
            currentY += 10;

            if (Object.keys(medicationFrequency).length === 0) {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                doc.text("No medication data available.", marginX, currentY);
            } else {
                const headers = [["Medication Name", "Usage Count"]];
                const data = Object.entries(medicationFrequency).map(([name, count]) => [name, count]);

                doc.autoTable({
                    startY: currentY,
                    head: headers,
                    body: data,
                    theme: "striped",
                    styles: { font: "helvetica", fontSize: 11 },
                    headStyles: { fillColor: [71, 147, 209] },
                    margin: { left: marginX, right: marginX },
                });
            }
        } else if (type === "Community Interaction Reports") {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Community Interaction Report", 105, 20, { align: "center" });

            currentY = 40;

            if (Object.keys(blogData).length === 0) {
                doc.setFontSize(12);
                doc.text("No blog data available.", marginX, currentY);
            } else {
                Object.keys(blogData).forEach((blogId) => {
                    const blog = blogData[blogId];
                    const authorName = userNames[blog.userId] || `User ${blog.userId}`;

                    const headers = [["Field", "Details"]];
                    const data = [
                        ["Blog Title", blog.title || "N/A"],
                        ["Author", authorName],
                        ["Date Created", blog.dateCreated || "N/A"],
                        ["Is Approved", blog.isApproved ? "Yes" : "No"],
                    ];

                    doc.autoTable({
                        startY: currentY,
                        head: headers,
                        body: data,
                        theme: "striped",
                        styles: { font: "helvetica", fontSize: 11 },
                        headStyles: { fillColor: [71, 147, 209] },
                        margin: { left: marginX, right: marginX },
                    });

                    currentY = doc.lastAutoTable.finalY + 20;

                    if (currentY > 270) {
                        doc.addPage();
                        currentY = 30;
                    }
                });
            }
        }

        doc.save(`${type}.pdf`);
    };

    // Prepare data for the chart
    const chartData = {
        labels: Object.keys(medicationFrequency),
        datasets: [
            {
                label: "Medication Usage Count",
                data: Object.values(medicationFrequency),
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <main style={{ flexGrow: 1, padding: "20px" }}>
            <Header />
            <section style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
                <StatCard label="Users" value={userCount} />
                <StatCard label="Blog Posts" value={blogPosts} />
            </section>
            <section style={{ margin: "20px 0" }}>
                <h2>Medication Frequency</h2>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: "Medications",
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: "Usage Count",
                                    },
                                    beginAtZero: true,
                                },
                            },
                        }}
                        height={400}
                        width={800}
                    />
                </div>
            </section>
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
