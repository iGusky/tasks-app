import express from "express"
import chalk from "chalk"
import cors from "cors"
import cookieParser from "cookie-parser"

import {connectDB} from "./config/database"
import {errorHandler} from "./middlewares/errorHandler"

import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import taskRoutes from "./routes/task.routes"
import { protectRoute } from "./middlewares/authMiddleware"

const PORT = process.env.PROT || 3000
const app = express()

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/tasks", protectRoute, taskRoutes)

app.use(errorHandler)

const startServer = async () => {
    await connectDB()
    app.listen(PORT, () => {

        console.log(chalk.bold.cyan(`Servidor corriendo en ${chalk.underline(`http://localhost:${PORT}`)} 🚀`))
    })
}

startServer()