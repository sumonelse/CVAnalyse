import jobModel from "./jobModel.js"
import companyModel from "../company/companyModel.js"

const createJob = async (req, res) => {
    const session = await jobModel.startSession() // Start a transaction session
    session.startTransaction()

    try {
        const {
            companyId,
            title,
            description,
            requirements = "", // Default empty string for safety
            minSalary,
            maxSalary,
            location,
        } = req.body

        // Check if the company exists in the DB
        const existingCompany = await companyModel.findById(companyId)
        if (!existingCompany) {
            await session.abortTransaction() // Abort transaction in case of failure
            session.endSession()
            return res.status(404).json({ message: "No such Company Exists!" })
        }

        // Split and trim requirements, removing any empty strings
        const reqArr = requirements
            .split(",")
            .map((req) => req.trim())
            .filter(Boolean)

        // Create the new job document
        const newJob = await jobModel.create(
            [
                {
                    title,
                    description,
                    requirements: reqArr,
                    salary: {
                        min: minSalary,
                        max: maxSalary,
                    },
                    location,
                    postedBy: companyId, // Set company as the poster
                },
            ],
            { session }
        )

        // Update the company's jobsPosted array
        const updatedCompany = await companyModel.findByIdAndUpdate(
            companyId,
            { $push: { jobsPosted: newJob[0]._id } },
            { new: true, session } // Use the session for consistency
        )

        // Commit the transaction to ensure both operations succeed
        await session.commitTransaction()
        session.endSession()

        // Return the created job as a response
        return res.status(201).json(newJob[0])
    } catch (err) {
        // Abort the transaction if any error occurs
        await session.abortTransaction()
        session.endSession()

        console.error("Error while creating the job:", err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export { createJob }
