import React from "react"
import { Link } from "react-router-dom"
import { useSkill } from "../context/SkillContext"

const Skills = () => {
    const { skills } = useSkill()
    console.log(skills)
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            {skills.length > 0 ? (
                <div className="flex flex-col items-center gap-3 w-2/3">
                    <h2 className="text-3xl font-bold">Skills Found</h2>
                    <div className="flex gap-3 flex-wrap items-center justify-center">
                        {skills.map((skill) => {
                            return (
                                <div className="p-[--btn-pd] w-fit rounded-md bg-gray-200 font-semibold">
                                    {skill}
                                </div>
                            )
                        })}
                    </div>
                    <Link to="/jobs" className="btn btn-primary">
                        Search Jobs
                    </Link>
                </div>
            ) : (
                <>
                    <h2 className="text-3xl font-semibold">No Skills Found</h2>
                    <Link to="/" className="btn btn-primary">
                        Analyze CV
                    </Link>
                </>
            )}
        </div>
    )
}

export default Skills
