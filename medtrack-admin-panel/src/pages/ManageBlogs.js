import React, { useEffect, useState } from "react";
import { db, ref, onValue, update, remove } from "../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const blogRef = ref(db, "blogs");
        onValue(blogRef, (snapshot) => {
            const blogData = snapshot.val();
            const blogList = blogData
                ? Object.entries(blogData).map(([id, data]) => ({ id, ...data }))
                : [];
            setBlogs(blogList);
        });
    }, []);

    const handleApprove = (id) => {
        update(ref(db, `blogs/${id}`), { isApproved: true });
    };

    const handleReject = (id) => {
        remove(ref(db, `blogs/${id}`));
    };

    return (
        <main style={{ flexGrow: 1, padding: "20px" }}>
            <Header />
            <h2>Manage Blogs</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Title</th>
                        <th style={thStyle}>Content</th>
                        <th style={thStyle}>Date Created</th>
                        <th style={thStyle}>Approval Status</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id} style={trStyle}>
                            <td
                                style={{ ...tdStyle, cursor: "pointer", color: "blue" }}
                                onClick={() => navigate(`/blogs/${blog.id}`)}
                            >
                                {blog.title || "Untitled Blog"}
                            </td>
                            <td style={tdStyle}>
                                {blog.content
                                    ? blog.content.replace(/<[^>]+>/g, "").slice(0, 50) + "..."
                                    : "No Content"}
                            </td>
                            <td style={tdStyle}>
                                {blog.dateCreated
                                    ? new Date(blog.dateCreated).toLocaleString()
                                    : "Unknown"}
                            </td>
                            <td style={tdStyle}>
                                {blog.isApproved ? "Approved" : "Pending Approval"}
                            </td>
                            <td style={tdStyle}>
                                {blog.isApproved ? (
                                    <span style={{ color: "green", fontWeight: "bold" }}>Approved</span>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleApprove(blog.id)}
                                            style={acceptButtonStyle}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(blog.id)}
                                            style={rejectButtonStyle}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

const thStyle = {
    padding: "10px",
    backgroundColor: "#f1f5f9",
    textAlign: "left",
    borderBottom: "1px solid #e5e7eb",
};

const trStyle = {
    borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
    padding: "10px",
    verticalAlign: "top",
};

const acceptButtonStyle = {
    padding: "5px 10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer",
};

const rejectButtonStyle = {
    padding: "5px 10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

export default ManageBlogs;
