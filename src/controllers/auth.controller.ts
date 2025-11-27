import { type Request, type Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/User"
import { AppError } from "../config/AppError";

const JWT_SECRET: string = process.env.JWT_SECRET ?? ""
export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body

    const user = await User.findOne({email: email}).exec()

    if(!user) throw new AppError("Usuario o contraseña invalido, por favor, revise sus datos e intente nuevamente", 500);

    const match = await bcrypt.compare(password, user.password)

    if(!match) throw new AppError("Contraseña incorrecta", 500)
    const maxAge = 24 * 60 * 60;
   
    const token = jwt.sign({userId: user.id, name: user.name, email: user.email}, JWT_SECRET, {
        expiresIn: maxAge
    });

    res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: process.env.APP_ENV == "production",
        sameSite: "lax",
        maxAge: maxAge * 1000
    })

    res.status(200).json({success: true, message: "Sesión iniciada exitosamente"})
}

export const status = async(req: Request, res: Response) => {
    const token = req.cookies.jwtToken
    if(!token) return res.status(401)
    jwt.verify(token, JWT_SECRET, (err: any) => {
        if(err) return res.status(401)
        res.status(200).json({success: true, data: true})
    })
}