// components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside style={{ width: "200px", backgroundColor: "#1F4D75", color: "white", padding: "20px" }}>
            <h2>Admin</h2>
            <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li>
                        <NavLink to="/home" style={linkStyle}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/manage-blogs" style={linkStyle}>
                            Manage Blogs
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    margin: "10px 0",
};

export default Sidebar;
