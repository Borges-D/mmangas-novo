import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import MangaPage from "./pages/MangasPage";
import RankingPage from "./pages/RankingPage";

export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const u = localStorage.getItem("user");
        return u ? JSON.parse(u) : null;
    });

    function handleLogin(newToken, newUser) {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                    path="/login"
                    element={
                        token ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
                    }
                />

                <Route
                    path="/register"
                    element={
                        token ? <Navigate to="/dashboard" replace /> : <RegisterPage />
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />
                    }
                />

                <Route path="/ranking" element={<RankingPage />} />

                <Route path="/manga/:mangaSlug" element={<MangaPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}
