import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import CompanyRegister from "./components/CompanyRegister"

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/company/register",
            element: <CompanyRegister />,
        },
    ])
    return <RouterProvider router={router} />
}

export default App
