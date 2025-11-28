import type { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import type { Token } from "../types/userToken";

export const addTask = async (req: Request, res: Response) => {
  const data = req.body;
  const userData: Token | null = jwt.decode(
    req.cookies.jwtToken
  ) as Token | null;

  if (!userData)
    return res.status(500).json({
      success: false,
      message: "No se ha podido verificar su identidad.",
    });

  const user = await User.findById(userData.id).exec();
  user?.tasks.push(data);
  user?.save();

  res.status(201).json({
    success: true,
    message: "Tarea agregada",
  });
};
