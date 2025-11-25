import { type Request, type Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/User"
import { AppError } from "../config/AppError";

export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email}).exec()

    if(!user) throw new AppError("Usuario o contraseña invalido, por favor, revise sus datos e intente nuevamente", 500);

    const match = await bcrypt.compare(password, user.password)

    if(!match) throw new AppError("Contraseña incorrecta", 500)
    
    const token = jwt.sign({userId: user.id, name: user.name, email: user.email}, "supersecretpassword");

    res.status(200).json({success: true, data: {token: token}})
}