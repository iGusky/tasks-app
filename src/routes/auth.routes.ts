import { Router } from "express";
import { login, status } from "../controllers/auth.controller";

const router = Router()

router.post("/login", login)
router.get("/status", status)

export default router