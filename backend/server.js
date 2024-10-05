import { config } from "dotenv"
import app from "./src/app.js"

const startServer = () => {
    const port = config.port || 5500

    app.listen(port, () => {
        console.log(`Sever started on PORT: ${port}`)
    })
}

startServer()
