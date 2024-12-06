import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
            navigate("/"); // Redirect to the login page
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <aside style={sidebarStyle}>
            <div style={contentStyle}>
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
            </div>
            <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
            </button>
        </aside>
    );
};

const sidebarStyle = {
    width: "200px",
    backgroundColor: "#1F4D75",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
};

const contentStyle = {
    flex: 1,
};

const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    margin: "10px 0",
};

const logoutButtonStyle = {
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "16px",
    marginBottom: "50px",
};

export default Sidebar;
