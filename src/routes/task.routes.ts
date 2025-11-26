import { Router } from "express";
import { addTask } from "../controllers/task.controller";

const router = Router()
router.post("/", addTask)

export default router