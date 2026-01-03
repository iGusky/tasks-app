import type { Request, Response } from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import type { Token } from "../types/userToken.js";
import { Task } from "../models/Task.js";
import { getUserId } from "../utils/getUserId.js";

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

export const getTasks = async (req: Request, res: Response) => {
  const userData: Token | null = jwt.decode(
    req.cookies.jwtToken
  ) as Token | null;

  if (!userData)
    return res.status(500).json({
      success: false,
      message: "No se ha podido verificar su identidad.",
    });

  const user = await User.findById(userData.id).exec();
  
  const tasks = user?.tasks;
  
  return res.status(200).json({success: true, data: {
    tasks: tasks
  }})
}

export const markAsDone = async (req: Request, res: Response) => {
  const {taskId} = req.body
  
  const userId = getUserId(req);
  await User.findOneAndUpdate({
    "_id": userId,
    "tasks._id": taskId
  }, {
    "$set": {
      "tasks.$.done": true
    }
  });
  return res.status(200).json({success: true})
}