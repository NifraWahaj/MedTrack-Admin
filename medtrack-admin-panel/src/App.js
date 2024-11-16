// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ManageBlogs from "./pages/ManageBlogs";
import BlogDetails from "./pages/BlogDetails";

const App = () => {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Router>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/manage-blogs" element={<ManageBlogs />} />
                    <Route path="/blogs/:id" element={<BlogDetails />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
