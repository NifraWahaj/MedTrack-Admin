import React from "react";

const LoginPage = () => {
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

    return (
        <div style={styles.loginPage}>
            <div style={styles.container}>
                <img src="/logo.svg" alt="App Logo" style={styles.logo} />
                <h1 style={styles.appName}>MedTrack</h1>
                <p style={styles.appDescription}>Stay on track, stay healthy</p>
                <input
                    type="text"
                    placeholder="USERNAME"
                    style={styles.inputField}
                    onFocus={(e) => (e.target.style.border = styles.inputFieldFocus.border)}
                    onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
                />
                <input
                    type="password"
                    placeholder="PASSWORD"
                    style={styles.inputField}
                    onFocus={(e) => (e.target.style.border = styles.inputFieldFocus.border)}
                    onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
                />
                <button
                    style={styles.loginButton}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = styles.loginButtonHover.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = styles.loginButton.backgroundColor)}
                >
                    LOGIN
                </button>
                <div style={styles.footer}>© 2024 MedTrack. All rights reserved.</div>
            </div>
        </div>
    );
};

export default LoginPage;
