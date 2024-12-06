import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import ManageBlogs from "./pages/ManageBlogs";
import BlogDetails from "./pages/BlogDetails";
import { getAuth } from "firebase/auth";
import { firestore, doc, getDoc } from "./firebase";

const App = () => {
    const ProtectedRoute = ({ children }) => {
        const auth = getAuth();
        const user = auth.currentUser;

        const [isAdmin, setIsAdmin] = React.useState(null);

        React.useEffect(() => {
            const checkAdmin = async () => {
                if (user) {
                    const adminRef = doc(firestore, "admins", user.email);
                    const adminDoc = await getDoc(adminRef);

                    if (adminDoc.exists() && adminDoc.data().role === "admin") {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } else {
                    setIsAdmin(false);
                }
            };

            checkAdmin();
        }, [user]);

        if (isAdmin === null) {
            return <p>Loading...</p>; // Show a loading indicator while checking admin status
        }

        return isAdmin ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <Routes>
                {/* Public Route for Login */}
                <Route path="/" element={<LoginPage />} />

                {/* Protected Routes with Sidebar */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <div style={{ display: "flex", minHeight: "100vh" }}>
                                <Sidebar />
                                <Routes>
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/manage-blogs" element={<ManageBlogs />} />
                                    <Route path="/blogs/:id" element={<BlogDetails />} />
                                </Routes>
                            </div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
