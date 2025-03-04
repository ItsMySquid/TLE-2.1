import {createBrowserRouter, RouterProvider} from "react-router";
import List from "../words/List.jsx";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <List/>
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App;