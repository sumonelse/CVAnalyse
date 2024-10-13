import { createContext, useContext, useState } from "react"

const SkillContext = createContext("")

const SkillContextProvider = ({ children }) => {
    const [skills, setSkills] = useState([])
    return (
        <SkillContext.Provider value={{ skills, setSkills }}>
            {children}
        </SkillContext.Provider>
    )
}

const useSkill = () => {
    const skills = useContext(SkillContext)
    return skills
}

export default SkillContextProvider
export { SkillContext, useSkill }
