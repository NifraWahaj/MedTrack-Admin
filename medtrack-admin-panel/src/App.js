import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import ManageBlogs from "./pages/ManageBlogs";
import BlogDetails from "./pages/BlogDetails";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route for Login */}
                <Route path="/" element={<LoginPage />} />

                {/* Protected Routes with Sidebar */}
                <Route
                    path="/*"
                    element={
                        <div style={{ display: "flex", minHeight: "100vh" }}>
                            <Sidebar />
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/manage-blogs" element={<ManageBlogs />} />
                                <Route path="/blogs/:id" element={<BlogDetails />} />
                            </Routes>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
