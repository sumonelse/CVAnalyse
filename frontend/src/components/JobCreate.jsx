import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormContainer from "./FormContainer"
import Input from "./Input"
import axios from "axios"

const JobCreate = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_DOMAIN}/api/jobs/create`,
                data
            )

            console.log(response.data)
            navigate("/jobs")
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <FormContainer
            heading={
                <span>
                    Post a Job
                    <span className="text-[--primary-color]">.</span>
                </span>
            }
            data={data}
            handleSubmit={handleSubmit}
        >
            <Input
                id={"title"}
                text={"Title:"}
                type={"text"}
                placeholder={"e.g. Need a UI/UX Designer"}
                name={"title"}
                handleChange={handleChange}
            />
            <Input
                id={"description"}
                text={"Description:"}
                type={"text"}
                placeholder={"e.g We want a UI/UX Desginer Having...."}
                name={"description"}
                handleChange={handleChange}
            />
            <Input
                id={"requirements"}
                text={"Requirements:"}
                type={"text"}
                placeholder={"e.g. C++, HTML, JS,..."}
                name={"requirements"}
                handleChange={handleChange}
            />
            <Input
                id={"min-salary"}
                text={"Min Salary:"}
                type={"number"}
                placeholder={"e.g. 100000"}
                name={"minSalary"}
                handleChange={handleChange}
            />
            <Input
                id={"max-salary"}
                text={"Max Salary:"}
                type={"number"}
                placeholder={"e.g. 150000"}
                name={"maxSalary"}
                handleChange={handleChange}
            />
            <Input
                id={"location"}
                text={"Location:"}
                type={"text"}
                placeholder={"e.g. Mumbai"}
                name={"location"}
                handleChange={handleChange}
            />
            <button className="btn btn-primary w-full bg-black">
                Post Job
            </button>
        </FormContainer>
    )
}

export default JobCreate
