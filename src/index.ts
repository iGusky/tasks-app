import express from "express"
import chalk from "chalk"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"

import {connectDB} from "./config/database.js"
import {errorHandler} from "./middlewares/errorHandler.js"

import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"
import { protectRoute } from "./middlewares/authMiddleware.js"

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL ?? "http://localhost:5173",
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