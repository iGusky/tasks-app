import express from "express"
import chalk from "chalk"
import cors from "cors"
import {connectDB} from "./config/database"
import userRoutes from "./routes/user.routes"

const PORT = process.env.PROT || 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/users", userRoutes)

const startServer = async () => {
    await connectDB()
    app.listen(PORT, () => {

        console.log(chalk.bold.cyan(`Servidor corriendo en ${chalk.underline(`http://localhost:${PORT}`)} 🚀`))
    })
}

startServer()