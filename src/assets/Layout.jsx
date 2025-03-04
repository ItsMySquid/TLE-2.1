import { Link, Outlet } from "react-router";

function Layout() {
    return (
        <div>
            <header>
                <div className="bg-headerColor-100 text-white py-10 px-28 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-tekstColor-100">Mijn Website</h1>
                    <Link
                        to={'/'}
                        className="bg-white text-green-600 hover:bg-gray-200"
                    >
                        Logout
                    </Link>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
            </footer>
        </div>
    );
}

export default Layout;
