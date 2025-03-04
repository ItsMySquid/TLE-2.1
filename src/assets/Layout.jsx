import { Link, Outlet } from "react-router";

function Layout() {
    return (
        <div>
            <header>
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
