import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import SkillContextProvider from "./context/SkillContext.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SkillContextProvider>
            <App />
        </SkillContextProvider>
    </StrictMode>
)
