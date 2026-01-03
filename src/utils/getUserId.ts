import type { Request } from "express";
import type { Token } from "../types/userToken";
import jwt from "jsonwebtoken";

export function getUserId(req: Request) {
    const userData: Token | null = jwt.decode(
    req.cookies.jwtToken
    ) as Token | null;
    
    if(!userData) return null
    return userData.id
}