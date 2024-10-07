import React, { useState } from "react"
import { Link } from "react-router-dom"
import AuthContainer from "./AuthContainer"
import Input from "./Input"

const CompanyRegister = () => {
    const [data, setData] = useState({})

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(data)
    }
    return (
        <AuthContainer
            heading={
                <span>
                    Create your Account
                    <span className="text-[--primary-color]">.</span>
                </span>
            }
            data={data}
            handleSubmit={handleSubmit}
        >
            <Input
                id={"name"}
                text={"Company Name:"}
                type={"text"}
                placeholder={"e.g. Google.Inc"}
                name={"name"}
                handleChange={handleChange}
            />
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
            <Input
                id={"phone-no."}
                text={"Phone No.:"}
                type={"number"}
                name={"phoneNumber"}
                handleChange={handleChange}
            />
            <button className="btn btn-secondary w-full bg-black">
                Register
            </button>
            <div className="text-gray-500 mx-auto">
                Already, have an account?{" "}
                <Link to={"/company/login"}>
                    <span className="text-[--primary-color]">Login</span>
                </Link>
            </div>
        </AuthContainer>
    )
}

export default CompanyRegister
