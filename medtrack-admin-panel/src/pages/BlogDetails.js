import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, ref, onValue } from "../firebase";
import Header from "../components/Header";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const blogRef = ref(db, `blogs/${id}`);
        onValue(blogRef, (snapshot) => {
            const data = snapshot.val();
            setBlog(data);
        });
    }, [id]);

    if (!blog) {
        return (
            <main style={{ flexGrow: 1, padding: "20px" }}>
                <Header />
                <p>Loading blog...</p>
            </main>
        );
    }

    return (
        <main style={{ flexGrow: 1, padding: "20px" }}>
            <Header />
            <article style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>
                <h1>{blog.title}</h1>
                <p style={{ color: "#606060", fontSize: "14px" }}>
                    <strong>Date Created:</strong>{" "}
                    {new Date(blog.dateCreated).toLocaleString()}
                </p>
                <div
                    style={{
                        marginTop: "20px",
                        fontSize: "16px",
                        color: "#333",
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <p style={{ marginTop: "20px", fontStyle: "italic", color: "#606060" }}>
                    <strong>Status:</strong> {blog.isApproved ? "Approved" : "Pending Approval"}
                </p>
            </article>
        </main>
    );
};

export default BlogDetails;
