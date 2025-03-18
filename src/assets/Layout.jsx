import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Layout() {
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", isDarkMode);
    }, [isDarkMode]);

    return (
        <div className="flex flex-col min-h-screen bg-background dark:bg-background-dark text-text dark:text-text-dark">
            {/* Header / Navbar */}
            <header className="bg-[#008571] text-white py-6 px-8 md:px-28 flex items-center justify-between shadow-lg">
                {/* Logo en titel */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-3">
                        <img src="/logo.svg" alt="Logo" className="w-16 h-16"/>
                        <h1 className="text-2xl font-semibold tracking-wide">Gebarentaal</h1>
                    </Link>
                </div>

                {/* Navigatie */}
                <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 text-lg font-medium">
                    {[
                        { name: "Woordenboek", path: "/woordenboek" },
                        { name: "Lessen", path: "/" },
                        { name: "Favorieten", path: "/favorieten" }
                    ].map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative pb-1 transition duration-300 ${
                                location.pathname === link.path
                                    ? "border-b-2 border-white"
                                    : "hover:text-gray-200"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Dark Mode Toggle */}
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="ml-auto p-2 rounded-full bg-primary text-white border border-primary hover:bg-[#00705e] transition"
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </header>

            {/* Pagina Inhoud */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-[#008571]  text-text dark:text-text-dark p-4 text-center">
                © 2025 Hogeschool Rotterdam
            </footer>
        </div>
    );
}

export default Layout;
