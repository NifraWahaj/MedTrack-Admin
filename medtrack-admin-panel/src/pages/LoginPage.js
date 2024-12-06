import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firestore, doc, getDoc } from "../firebase"; // Update paths as needed
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const styles = {
        loginPage: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f5f5f9",
            fontFamily: "'Lato', sans-serif",
        },
        container: {
            width: "400px",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            textAlign: "center",
        },
        logo: {
            width: "100px",
            marginBottom: "20px",
        },
        appName: {
            fontSize: "28px",
            fontWeight: "700",
            color: "#1F4D75",
            marginBottom: "10px",
        },
        appDescription: {
            fontSize: "14px",
            color: "#606060",
            marginBottom: "30px",
        },
        inputField: {
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxSizing: "border-box",
            outline: "none",
            backgroundColor: "#f9f9f9",
            transition: "border 0.3s ease",
        },
        inputFieldFocus: {
            border: "1px solid #1F4D75",
        },
        loginButton: {
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#1F4D75",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            marginTop: "20px",
        },
        loginButtonHover: {
            backgroundColor: "#163A57",
        },
        footer: {
            marginTop: "20px",
            fontSize: "12px",
            color: "#606060",
        },
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            // Authenticate the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if the user is an admin
            const adminRef = doc(firestore, "admins", email); // Check Firestore for admin email
            const adminDoc = await getDoc(adminRef);

            if (adminDoc.exists() && adminDoc.data().role === "admin") {
                console.log("Admin login successful:", user.email);
                navigate("/home"); // Redirect to admin dashboard
            } else {
                throw new Error("Access Denied: You are not an admin.");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div style={styles.loginPage}>
            <div style={styles.container}>
                <img src="/logo.svg" alt="App Logo" style={styles.logo} />
                <h1 style={styles.appName}>MedTrack</h1>
                <p style={styles.appDescription}>Stay on track, stay healthy</p>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.inputField}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.inputField}
                        required
                    />
                    <button
                        type="submit"
                        style={styles.loginButton}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.loginButtonHover.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.loginButton.backgroundColor)}
                    >
                        LOGIN
                    </button>
                </form>
                <div style={styles.footer}>© 2024 MedTrack. All rights reserved.</div>
            </div>
        </div>
    );
};

export default LoginPage;
