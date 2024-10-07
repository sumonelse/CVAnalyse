import React, { useState } from "react"

const AuthContainer = ({ heading, children, data, handleSubmit }) => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center ">
            <form
                onSubmit={handleSubmit}
                className="w-[95vw] md:min-w-[40vw] md:max-w-[50vw] flex flex-col gap-2 shadow-xl p-[--btn-pd] rounded-md"
            >
                <h2 className="text-3xl font-bold mb-3">{heading}</h2>
                {children}
            </form>
        </div>
    )
}

export default AuthContainer
