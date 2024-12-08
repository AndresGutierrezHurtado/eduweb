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
import ProtectedRoutes from "./middlewares/protectedRoutes";

export default function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    {/* Rutas con autenticacion requerida */}
                    <Route element={<ProtectedRoutes mustBeAuth />}>
                        <Route element={<AppLayout />}>
                            <Route path="/profile" element={<h2>Perfil</h2>} />
                        </Route>
                    </Route>

                    {/* Rutas publicas */}
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<h2>Cursos</h2>} />
                    </Route>

                    {/* Rutas sin autenticacion requerida */}
                    <Route element={<ProtectedRoutes mustBeGuest />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/recovery" element={<Recovery />} />
                        <Route path="/reset/:token" element={<Reset />} />
                    </Route>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}
