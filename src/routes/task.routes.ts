import { Router } from "express";
import { addTask, getTasks, markAsDone } from "../controllers/task.controller.js";
const router = Router()
router.post("/", addTask)
router.get("/", getTasks)
router.post('/done', markAsDone)

export default router