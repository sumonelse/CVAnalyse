import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import FormContainer from "./FormContainer"
import Input from "./Input"
import axios from "axios"

const CompanyLogin = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_DOMAIN}/api/company/login`,
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
                    Login to your Account
                    <span className="text-[--primary-color]">.</span>
                </span>
            }
            data={data}
            handleSubmit={handleSubmit}
        >
            <Input
                id={"email"}
                text={"Email:"}
                type={"email"}
                placeholder={"e.g. company@mail.com"}
                name={"email"}
                handleChange={handleChange}
            />
            <Input
                id={"password"}
                text={"Password:"}
                type={"password"}
                placeholder={"Between 4-20 characters"}
                name={"password"}
                handleChange={handleChange}
            />
            <button className="btn btn-primary w-full bg-black">Login</button>
            <div className="text-gray-500 mx-auto">
                Don't have an Account?{" "}
                <Link to={"/company/register"}>
                    <span className="text-[--primary-color]">Register</span>
                </Link>
            </div>
        </FormContainer>
    )
}

export default CompanyLogin
