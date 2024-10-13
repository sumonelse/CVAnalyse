import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import { useSkill } from "../context/SkillContext"
import { useNavigate } from "react-router-dom"

const ResumeUploader = () => {
    const [file, setFile] = useState(null)
    const { skills, setSkills } = useSkill()
    const navigate = useNavigate()
    // const [uploadResult, setUploadResult] = useStateate("")

    const onDrop = (acceptedFiles) => {
        // Get the first file from the accepted files list
        setFile(acceptedFiles[0])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ".pdf,.doc,.docx", // Accept only specific file types
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!file) {
            alert("Please upload a file")
            return
        }

        const formData = new FormData()
        formData.append("cvFile", file)

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_DOMAIN}/api/resume/analyze`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            setSkills(response.data.skills)
            navigate("/skills")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="w-screen h-screen grid place-items-center">
            {/* Drag and Drop Area */}
            <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center gap-5 px-16 py-10 rounded-md border-dashed border-4 cursor-pointer"
            >
                {isDragActive ? (
                    <h2>Drop your File here</h2>
                ) : (
                    <>
                        <input {...getInputProps()} />
                        <img
                            src="/images/uploadIcon.svg"
                            className="w-20"
                            alt=""
                        />
                        <h2 className="font-semibold text-2xl">
                            Drag & Drop a File here
                        </h2>
                        <button className="btn btn-secondary">Browse</button>
                    </>
                )}
            </div>

            {/* Display the uploaded file name */}
            {file && (
                <div className="flex flex-col items-center gap-2">
                    <p>Selected file: {file.name}</p>
                    <button onClick={handleSubmit} className="btn btn-primary">
                        Analyze CV
                    </button>
                </div>
            )}

            {/* Submit Button */}
        </div>
    )
}

export default ResumeUploader
