import React, { useState } from "react"
import { Link } from "react-router-dom"
import AuthContainer from "./AuthContainer"
import Input from "./Input"

const CompanyLogin = () => {
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
        </AuthContainer>
    )
}

export default CompanyLogin
