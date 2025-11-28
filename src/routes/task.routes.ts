import { Router } from "express";
import { addTask } from "../controllers/task.controller";
import { protectRoute } from "../middlewares/authMiddleware";

const router = Router()
router.post("/", addTask)

export default router