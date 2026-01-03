import { Router } from "express";
import { login, logout, status } from "../controllers/auth.controller.js";

const router = Router()

router.post("/login", login)
router.get("/status", status)
router.get("/logout", logout)

export default router