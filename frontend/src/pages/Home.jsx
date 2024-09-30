import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"

const Home = () => {
    const [file, setFile] = useState(null)
    const [uploadResult, setUploadResult] = useState("")

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
            // Send file to backend
            const response = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            // Call analysis endpoint
            const analyzeResponse = await axios.post(
                "http://localhost:5000/analyze",
                formData
            )
            setUploadResult(analyzeResponse.data.extractedText)
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
                <input {...getInputProps()} />
                <img src="/images/uploadIcon.svg" className="w-20" alt="" />
                <h2 className="font-semibold text-2xl">
                    Drag & Drop a File here
                </h2>
                <button onClick={handleSubmit} className="btn-primary">
                    Browse
                </button>
            </div>

            {/* Display the uploaded file name */}
            {file && (
                <div className="file-details">
                    <p>Selected file: {file.name}</p>
                </div>
            )}

            {/* Submit Button */}
        </div>
    )
}

export default Home
