// pages/BlogDetails.js
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
            setBlog(snapshot.val());
        });
    }, [id]);

    const renderContent = (content) => {
        if (!content) {
            return <p>No content available.</p>;
        }

        let parsedContent;

        try {
            parsedContent = typeof content === "string" ? JSON.parse(content) : content;
        } catch (error) {
            console.error("Error parsing content:", error);
            return <p>Unable to load content.</p>;
        }

        if (!Array.isArray(parsedContent)) {
            return <p>Invalid content format.</p>;
        }

        return parsedContent.map((block, index) => {
            if (block.text) {
                return (
                    <p
                        key={index}
                        style={{
                            fontWeight: block.isBold ? "bold" : "normal",
                            fontStyle: block.isItalic ? "italic" : "normal",
                            textDecoration: block.isStrikethrough ? "line-through" : "none",
                        }}
                    >
                        {block.text}
                    </p>
                );
            }
            if (block.imageBase64) {
                return <img key={index} src={block.imageBase64} alt="Blog Content" style={{ maxWidth: "100%", margin: "10px 0" }} />;
            }
            return null;
        });
    };

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <main style={{ flexGrow: 1, padding: "20px" }}>
            <Header />
            <h1>{blog.title}</h1>
            <p>
                <strong>Author:</strong> {blog.author}
            </p>
            <p>
                <strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}
            </p>
            <div>{renderContent(blog.content)}</div>
        </main>
    );
};

export default BlogDetails;
