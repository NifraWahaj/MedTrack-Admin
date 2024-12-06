import React, { useEffect, useState } from "react";
import { db, ref, onValue } from "../firebase";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import UserGrowthChart from "../components/UserGrowthChart";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jsPDF AutoTable plugin for table support

const Home = () => {
    const [userCount, setUserCount] = useState(0);
    const [blogPosts, setBlogPosts] = useState(0);
    const [userGrowth, setUserGrowth] = useState([]);
    const [medicationData, setMedicationData] = useState({});
    const [userNames, setUserNames] = useState({});
    const [blogData, setBlogData] = useState({});

    useEffect(() => {
        fetchRealtimeData();
    }, []);

    const fetchRealtimeData = () => {
        // Fetch user count and names
        const userRef = ref(db, "users");
        onValue(userRef, (snapshot) => {
            const users = snapshot.val();
            setUserCount(Object.keys(users || {}).length);

            // Extract user names
            const names = {};
            Object.keys(users || {}).forEach((userId) => {
                names[userId] = users[userId].name || `User ${userId}`; // Default to User ID if name is missing
            });
            setUserNames(names);
        });

        // Fetch blog post count and blog data
        const blogRef = ref(db, "blogs");
        onValue(blogRef, (snapshot) => {
            const blogs = snapshot.val();
            setBlogPosts(Object.keys(blogs || {}).length);
            setBlogData(blogs || {});
        });

        // Fetch medication data for all users
        const medRef = ref(db, "medications");
        onValue(medRef, (snapshot) => {
            const data = snapshot.val();
            console.log("Fetched medication data:", data); // Debugging output
            setMedicationData(data || {});
        });
    };

    const generatePDF = (type) => {
        const doc = new jsPDF();
        const marginX = 15;
        let currentY = 30;

        if (type === "Medication Usage Reports") {
            // Title for Medication Report
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Medication Usage Report", 105, 20, { align: "center" });

            // Medication Report Content
            doc.setFontSize(14);
            doc.text("Summary", marginX, currentY);
            currentY += 10;

            if (Object.keys(medicationData).length === 0) {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                doc.text("No medication data available.", marginX, currentY);
            } else {
                Object.keys(medicationData).forEach((userId) => {
                    const userMeds = medicationData[userId];
                    const userName = userNames[userId] || `User ${userId}`; // Fallback to User ID if name is unavailable

                    // Section Title for Each User
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(14);
                    currentY += 10;
                    doc.text(`User: ${userName}`, marginX, currentY);
                    currentY += 10;

                    if (userMeds) {
                        const headers = [["Medicine Name", "Frequency", "Refill Amount", "Reminder Time"]];
                        const data = Object.keys(userMeds).map((medId) => {
                            const med = userMeds[medId];
                            return [
                                med.name || "N/A",
                                med.frequency || "N/A",
                                med.refillAmount || "N/A",
                                med.reminderTime || "N/A",
                            ];
                        });

                        // Generate Medication Table
                        doc.autoTable({
                            startY: currentY,
                            head: headers,
                            body: data,
                            theme: "striped",
                            styles: { font: "helvetica", fontSize: 11 },
                            headStyles: { fillColor: [71, 147, 209] },
                            margin: { left: marginX, right: marginX },
                        });

                        currentY = doc.lastAutoTable.finalY + 10;
                    }

                    if (currentY > 270) {
                        doc.addPage();
                        currentY = 30;
                    }
                });
            }
        } else if (type === "Community Interaction Reports") {
            // Title for Community Interaction Report
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Community Interaction Report", 105, 20, { align: "center" });

            currentY = 40;

            if (Object.keys(blogData).length === 0) {
                doc.setFontSize(12);
                doc.text("No blog data available.", marginX, currentY);
            } else {
                // Loop through each blog and create a separate table for each
                Object.keys(blogData).forEach((blogId) => {
                    const blog = blogData[blogId];
                    const authorName = userNames[blog.reviews_and_ratings?.userId] || `User ${blog.reviews_and_ratings?.userId}`;

                    // Define headers and data for the table
                    const headers = [["Field", "Details"]];
                    const data = [
                        ["Blog Title", blog.reviews_and_ratings?.title || "N/A"],
                        ["Author", authorName],
                        ["Content", blog.content || "N/A"],
                        ["Date Created", blog.dateCreated || "N/A"],
                        ["Is Approved", blog.isApproved ? "Yes" : "No"],
                    ];

                    if (blog.reviews_and_ratings) {
                        data.push(["Review", blog.reviews_and_ratings.title || "No reviews available"]);
                    }

                    // Generate Blog Data Table
                    doc.autoTable({
                        startY: currentY,
                        head: headers,
                        body: data,
                        theme: "striped",
                        styles: { font: "helvetica", fontSize: 11 },
                        headStyles: { fillColor: [71, 147, 209] },
                        margin: { left: marginX, right: marginX },
                    });

                    // Update the position for the next table
                    currentY = doc.lastAutoTable.finalY + 20;

                    // Add a new page if the content exceeds the page height
                    if (currentY > 270) {
                        doc.addPage();
                        currentY = 30;
                    }
                });
            }
        }

        // Save the PDF
        doc.save(`${type}.pdf`);
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
