import express from "express"
import { analyzeResume } from "./resumeController.js"
import { upload } from "../middleware/multer.js"

const resumeRouter = express.Router()

// ROUTES
resumeRouter.post("/analyze", upload.single("cvFile"), analyzeResume)

export default resumeRouter
