import express from "express"
import { loginCompany, registerCompany } from "./companyController.js"

const companyRouter = express.Router()

companyRouter.post("/register", registerCompany)
companyRouter.post("/login", loginCompany)

export default companyRouter
