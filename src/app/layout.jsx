import "./globals.css";

export const metadata = {
    title: "Inicio | Eduweb",
    description: "This is the homepage of Eduweb, a platform for educational resources.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
