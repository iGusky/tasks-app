import { Router } from "express";
import { createUser, profile } from "../controllers/user.controller.js";

const router = Router()

router.post("/", createUser)
router.get("/profile", profile)

export default router