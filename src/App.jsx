import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

// Pages
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Recovery from "./pages/auth/recovery";
import Reset from "./pages/auth/reset";

// Layouts
import AppLayout from "./layouts/appLayout";

// Contexts
import { AuthContextProvider } from "./contexts/authContext";

export default function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/recovery" element={<Recovery />} />
                    <Route path="/reset/:token" element={<Reset />} />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}
