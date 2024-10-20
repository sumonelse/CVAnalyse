import express from "express"
import { createJob, searchJobs } from "./jobController.js"

const jobRouter = express.Router()

jobRouter.post("/create", createJob)
jobRouter.get('/search', searchJobs)

export default jobRouter
