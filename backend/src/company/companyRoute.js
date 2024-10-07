import express from "express"
import { registerCompany } from "./companyController.js"

const companyRouter = express.Router()

companyRouter.post("/register", registerCompany)

export default companyRouter
