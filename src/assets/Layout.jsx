import { Link, Outlet } from "react-router";

function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-headerColor-100 text-white py-10 px-28 flex items-center">
                {/* Container voor logo en tekst, verder naar links */}
                <div className="flex items-center mr-auto">
                    <img src="/logo.svg" alt="Logo" className="w-20 h-20 mr-3" />
                    <h1 className="text-xl font-bold text-tekstColor-100">Gebarentaal</h1>
                </div>

                {/* Centraal geplaatste navigatie links */}
                <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
                    <Link
                        to={`/woordenboek`}
                        className="text-white hover:text-green-600"
                    >
                        Woordenboek
                    </Link>
                    <Link
                        to={`/les`}
                        className="text-white hover:text-green-600"
                    >
                        Lessen
                    </Link>
                    <Link
                        to={`/favorieten`}
                        className="text-white hover:text-green-600"
                    >
                        Favorieten
                    </Link>
                </div>

                {/* Logout link rechts */}
                <div className="ml-auto">
                    <Link
                        to={'/'}
                        className="text-white hover:text-green-600"
                    >
                        Logout
                    </Link>
                </div>
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer>
            </footer>
        </div>
    );
}

export default Layout;
