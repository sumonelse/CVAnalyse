import pdf from "pdf-parse"
import fs from "node:fs"
import { extractSkills } from "../utils/skillsExtract.js"

const analyzeResume = async (req, res) => {
    const file = req.file

    // Check if file is available
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" })
    }

    const filePath = `uploads/${req.file.filename}`
    const fileData = fs.readFileSync(filePath)

    try {
        // Parse the PDF file to extract text
        const data = await pdf(fileData)
        const extractedText = data.text

        const skillSet = extractSkills(extractedText)
        const skills = [...skillSet]

        // Respond with the extracted text
        return res.json({ skills })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Error processing the CV file" })
    }
}
export { analyzeResume }
