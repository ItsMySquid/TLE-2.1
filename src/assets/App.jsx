import {createBrowserRouter, RouterProvider} from "react-router";
import List from "../words/List.jsx";
import Word from "../words/Word.jsx";
import Favorites from "../words/Favorites.jsx";
import Assignment from "../assignments/Assignment.jsx";
import Lesson from "../assignments/Lesson.jsx";
import Overview from "../assignments/Overview.jsx";
import Results from "../assignments/Results.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import Login from "../account/Login.jsx";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Dashboard/>
            },
            {
                path: '/woordenboek',
                element: <List/>
            },
            {
                path: '/woord/:id',
                element: <Word/>
            },
            {
                path: '/opdracht/:id',
                element: <Assignment/>
            },
            {
                path: '/Les',
                element: <Lesson/>
            },
            {
                path: '/Overzicht',
                element: <Overview/>
            },
            {
                path: '/Resultaten',
                element: <Results/>
            },
            {
                path: '/Login',
                element: <Login/>
            },
            {
                path: '/Favorieten',
                element: <Favorites/>
            },
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App;