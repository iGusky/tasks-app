import type { Request, Response } from "express";
import { User } from "../models/User";

export const createUser = async(req: Request, res: Response) => {
    const {name, lastname, email} = req.body;
    const user = new User({name, lastname, email})
    await user.save()
    res.status(201).json(user)
}