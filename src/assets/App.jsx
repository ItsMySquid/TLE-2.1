import { createBrowserRouter, RouterProvider } from "react-router-dom";
import List from "../words/List.jsx";
import Word from "../words/Word.jsx";
import Favorites from "../words/Favorites.jsx";
import Assignment from "../assignments/Assignment.jsx";
import Lesson from "../assignments/Lesson.jsx";
import Overview from "../assignments/Overview.jsx";
import Results from "../assignments/Results.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import Login from "../account/Login.jsx"; // Login als tussenpagina
import Layout from "./Layout.jsx";
import ProtectedRoute from "../account/ProtectedRoute.jsx"; // Beveiligde routes

const router = createBrowserRouter([
    { path: "/login", element: <Login /> }, // Tussenpagina

    {
        // element: <ProtectedRoute />, // Beveiligde routes
        children: [
            {
                element: <Layout />,
                children: [
                    { path: "/", element: <Dashboard /> },
                    { path: "/woordenboek", element: <List /> },
                    { path: "/woord/:id", element: <Word /> },
                    { path: "/opdracht/:id", element: <Assignment /> },
                    { path: "/Les/:id", element: <Lesson /> },
                    { path: "/Overzicht/:id", element: <Overview /> },
                    { path: "/Resultaten", element: <Results /> },
                    { path: "/Favorieten", element: <Favorites /> },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
