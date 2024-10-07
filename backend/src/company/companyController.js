import bcrypt from "bcryptjs"
import companyModel from "./companyModel.js"

const registerCompany = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body

        const existingCompany = await companyModel.findOne({ name })
        if (existingCompany) {
            return res.status(409).json({ message: "Company already exists" })
        }

        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(password, 10)

        const company = await companyModel.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
        })

        const resCompany = {
            name: company.name,
            email: company.email,
            phoneNumber: company.phoneNumber,
        }

        return res.status(201).send(resCompany)
    } catch (err) {
        console.log("Error while REGISTERING the COMPANY", err)
        res.status(500).send({
            message: "Error while REGISTERING the COMPANY",
        })
    }
}

export { registerCompany }
