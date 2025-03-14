import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-headerColor-100 text-white py-10 px-28 flex items-center">
                {/* Container voor logo en tekst, verder naar links */}
                <div className="flex items-center mr-auto">
                    <Link to="./" className="flex items-center">
                        <img src="/logo.svg" alt="Logo" className="w-20 h-20 mr-3"/>
                        <h1 className="text-xl font-bold text-tekstColor-100">Gebarentaal</h1>
                    </Link>
                </div>


                {/* Centraal geplaatste navigatie links */}
                <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
                    <Link to={`/woordenboek`} className="text-white">
                    Woordenboek
                    </Link>
                    <Link to={`/`} className="text-white">
                        Lessen
                    </Link>
                    <Link to={`/favorieten`} className="text-white">
                        Favorieten
                    </Link>
                </div>
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
