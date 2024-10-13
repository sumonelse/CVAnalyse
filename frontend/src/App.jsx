import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import CompanyRegister from "./components/CompanyRegister"
import CompanyLogin from "./components/CompanyLogin"
import Skills from "./pages/Skills"
import Jobs from "./pages/Jobs"
import JobCreate from "./components/JobCreate"

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/skills",
            element: <Skills />,
        },
        {
            path: "/jobs",
            children: [
                {
                    path: "",
                    element: <Jobs />,
                },
                {
                    path: "create",
                    element: <JobCreate />,
                },
            ],
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
