import type { Request, Response } from "express";

export const addTask = async (req: Request, res: Response) => {
    const data = req.body
    console.log(data)

    res.status(201).json({
        success: true,
        message: "Tarea agregada"
    })
}