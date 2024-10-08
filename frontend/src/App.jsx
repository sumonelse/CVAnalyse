import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import CompanyRegister from "./components/CompanyRegister"
import CompanyLogin from "./components/CompanyLogin"

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/company",
            children: [
                {
                    path: "register",
                    element: <CompanyRegister />,
                },
                {
                    path: "login",
                    element: <CompanyLogin />,
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}

export default App
