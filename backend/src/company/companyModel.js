import mongoose, { mongo } from "mongoose"

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            // required: true,
        },
        jobsPosted: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Job",
                },
            ],
        },
        dateJoined: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
)

const companyModel = mongoose.model("company", companySchema)

export default companyModel
