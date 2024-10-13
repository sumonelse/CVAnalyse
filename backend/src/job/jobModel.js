import mongoose from "mongoose"

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: {
            type: [String],
            required: true,
        },
        salary: {
            min: {
                type: Number,
                required: true,
            },
            max: {
                type: Number,
                required: true,
            },
        },
        location: {
            type: String,
            required: true,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            // required: true,
        },
        applicants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Candidate", // assuming 'User' is your job applicant entity
            },
        ],
        postedAt: {
            type: Date,
            default: Date.now,
        },
        deadline: {
            type: Date,
            // required: true,
        },
    },
    { versionKey: false }
)

const jobModel = mongoose.model("job", jobSchema)

export default jobModel
