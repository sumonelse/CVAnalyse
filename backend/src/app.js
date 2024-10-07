import express from "express"
import resumeRouter from "./resume/resumeRoute.js"
import companyRouter from "./company/companyRoute.js"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    return res.json({
        message: "Hello World",
    })
})

app.use("/api/resume", resumeRouter)
app.use("/api/company", companyRouter)

export default app
