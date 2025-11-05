import type { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt"
import type { MongooseError } from "mongoose";

export const createUser = async(req: Request, res: Response) => {
    try {

        const {name, lastname, email, password} = req.body;
        
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        
        const user = new User({name, lastname, email, password: hash})
        await user.save()
        res.status(201).json({sucess: true, data: user, message: "Usuario creado exitosamente."})
    } catch (e: any) {
        res.status(500).json({success: false, message: e.errmsg})
    }
}