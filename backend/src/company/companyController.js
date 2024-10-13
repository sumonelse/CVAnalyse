import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
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

const loginCompany = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check if the company exists by email
        const company = await companyModel.findOne({ email })
        if (!company) {
            return res.status(404).json({ message: "Company not found" })
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, company.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }

        // Generate a JWT token
        const token = jwt.sign(
            {
                companyId: company._id,
                email: company.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        // Send response with the token and company details (excluding the password, cauz its sensitive shhhh....)
        const resCompany = {
            name: company.name,
            email: company.email,
            phoneNumber: company.phoneNumber,
            token,
        }

        return res.status(200).json(resCompany)
    } catch (err) {
        console.error("Error while LOGGING IN the COMPANY", err)
        return res.status(500).json({
            message: "Error while LOGGING IN the COMPANY",
        })
    }
}

export { registerCompany, loginCompany }
