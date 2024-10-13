import express from "express"
import cors from "cors"
import { config } from "./config/config.js"
import resumeRouter from "./resume/resumeRoute.js"
import companyRouter from "./company/companyRoute.js"
import jobRouter from "./job/jobRoute.js"

const app = express()

app.use(
    cors({
        origin: config.frontendDomain,
    })
)
app.use(express.json())

app.get("/", (req, res) => {
    return res.json({
        message: "Hello World",
    })
})

app.use("/api/resume", resumeRouter)
app.use("/api/company", companyRouter)
app.use("/api/jobs", jobRouter)

export default app
