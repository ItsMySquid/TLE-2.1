import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App;