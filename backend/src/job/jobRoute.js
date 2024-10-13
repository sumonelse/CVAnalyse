import express from "express"
import { createJob } from "./jobController.js"

const jobRouter = express.Router()

jobRouter.post("/create", createJob)

export default jobRouter
