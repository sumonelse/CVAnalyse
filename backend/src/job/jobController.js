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

const searchJobs = async (req, res) => {
    try {
        // Extracting filters from query parameters
        const { title, location, minSalary, maxSalary, requirements } = req.query;
        
        // Building the MongoDB query dynamically
        let query = {};

        // Filter by title (case-insensitive search)
        if (title) {
            query.title = { $regex: title, $options: 'i' };  // 'i' for case-insensitive
        }

        // Filter by location (exact match)
        if (location) {
            query.location = location;
        }

        // Filter by salary range
        if (minSalary && maxSalary) {
            query["salary.min"] = { $gte: Number(minSalary) };  // Greater than or equal to
            query["salary.max"] = { $lte: Number(maxSalary) };  // Less than or equal to
        }

        // Filter by requirements (looking for any match in the array)
        if (requirements) {
            const reqArr = requirements.split(',').map(req => req.trim());
            query.requirements = { $in: reqArr };  // Matches any of the given requirements
        }

        // Fetch jobs that match the query
        const jobs = await jobModel.find(query);

        console.log("query", query)

        // If no jobs found, return appropriate message
        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found matching the criteria." });
        }

        // Send back the list of jobs
        res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in searching jobs", error);
        res.status(500).json({ message: "Error in searching jobs" });
    }
};


export { createJob, searchJobs }
