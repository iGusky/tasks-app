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
        if(e.code == 11000) res.status(500).json({success: false, message: "Ya existe un usuario registrado con ese correo electrónico, ingrese uno diferente e intente nuevamente."})
        res.status(500).json({success: false, message: e.errmsg})
    }
}