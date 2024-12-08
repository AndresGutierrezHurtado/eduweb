import React from "react";
import { Outlet } from "react-router";

// Components
import Header from "./header";

export default function AppLayout() {
    return (
        <main>
            {/* Header */}
            <Header />

            {/* Content */}
            <Outlet />

            {/* Footer */}
        </main>
    );
}
