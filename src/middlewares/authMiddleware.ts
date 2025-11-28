import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
export const protectRoute = (req: Request, res: Response, next: any) => {
  const token = req.cookies.jwtToken;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Por favor, inicie sesión" });
  jwt.verify(token, JWT_SECRET, (err: any) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Token no valid" });
    }
    next();
  });
};
