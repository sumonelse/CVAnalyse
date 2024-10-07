import React from "react"

const Input = ({ id, text, type, placeholder = "", name, handleChange }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="font-semibold">
                {text}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                className="border-solid border-2 p-[--btn-pd] rounded-md"
            />
        </div>
    )
}

export default Input
