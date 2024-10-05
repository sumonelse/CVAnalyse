import { config } from "dotenv"
import app from "./src/app.js"
import connectDB from "./src/config/db.js"

const startServer = async () => {
    await connectDB()

    const port = config.port || 5500

    app.listen(port, () => {
        console.log(`Sever started on PORT: ${port}`)
    })
}

startServer()
