"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

// Components
import Header from "@/layouts/header.jsx";
import Footer from "@/layouts/footer.jsx";

import "./globals.css";

export default function RootLayout({ children }) {
    useEffect(() => {
        document.title = "Inicio | Eduweb";
    }, []);

    return (
        <html lang="es">
            <body className="antialiased">
                <SessionProvider>
                    <div id="root" className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}
