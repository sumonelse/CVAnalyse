import express from "express"
import resumeRouter from "./resume/resumeRoute.js"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    return res.json({
        message: "Hello World",
    })
})

app.use("/api/resume", resumeRouter)

export default app
