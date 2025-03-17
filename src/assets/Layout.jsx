import { Link, Outlet, useLocation } from "react-router-dom";

function Layout() {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-headerColor-100 text-white py-6 px-8 md:px-28 flex items-center relative shadow-lg">
                {/* Logo en titel */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-3">
                        <img src="/logo.svg" alt="Logo" className="w-16 h-16"/>
                        <h1 className="text-2xl font-semibold tracking-wide text-tekstColor-100">Gebarentaal</h1>
                    </Link>
                </div>

                {/* Navigatie in het midden */}
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
            </header>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer>
                <p className="text-center bg-tekstColor-100 text-backgroundColor-100 p-4">
                    © 2025 Hogeschool Rotterdam
                </p>
            </footer>
        </div>
    );
}

export default Layout;
