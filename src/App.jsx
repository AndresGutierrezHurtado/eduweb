import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

// Pages
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Recovery from "./pages/auth/recovery";
import Reset from "./pages/auth/reset";
import Courses from "./pages/courses";
import UserProfile from "./pages/profile/user";
import UsersDashboard from "./pages/admin/users";
import Activities from "./pages/Activities";
import Results from "./pages/Results";
import Course from "./pages/course";
import TeacherCourses from "./pages/profile/courses";

// Layouts
import AppLayout from "./layouts/appLayout";
import AdminLayout from "./layouts/adminLayout";

// Contexts
import { AuthContextProvider } from "./contexts/authContext";

// Middlewares
import ProtectedRoutes from "./middlewares/protectedRoutes";

export default function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    {/* Rutas protegidas */}
                    <Route element={<ProtectedRoutes mustBeAdmin />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin/users" element={<UsersDashboard />} />
                        </Route>
                    </Route>

                    {/* Rutas con autenticacion requerida */}
                    <Route element={<ProtectedRoutes mustBeAuth />}>
                        <Route element={<AppLayout />}>
                            <Route path="/profile/:id?" element={<UserProfile />} />
                            <Route path="/profile/courses" element={<TeacherCourses />} />
                            <Route path="/activities" element={<Activities />} />
                            <Route path="/results" element={<Results />} />
                        </Route>
                    </Route>

                    {/* Rutas publicas */}
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/courses/:id" element={<Course />} />
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
