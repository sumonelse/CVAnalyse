import jobModel from "./jobModel.js"

const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            minSalary,
            maxSalary,
            location,
        } = req.body

        console.log(requirements)

        const job = await jobModel.create({
            title,
            description,
            requirements,
            salary: {
                min: minSalary,
                max: maxSalary,
            },
            location,
        })

        return res.status(201).send(job)
    } catch (err) {
        console.log("Error while POSTING the JOB", err)
        res.status(500).send({
            message: "Error while POSTING the JOB",
        })
    }
}

export { createJob }
