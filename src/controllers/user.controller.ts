import type { Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

export const createUser = async (req: Request, res: Response) => {
  try {
    /* Obtención de los datos del usuario */
    const { name, lastname, email, password } = req.body;

    /* Cifrado de contraseña */
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    /* Creación del usuario */
    const user = new User({ name, lastname, email, password: hash });
    await user.save();

    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      "supersecretpassword"
    );

    /* Creación del token para iniciar su sesión */

    res.status(201).json({
      sucess: true,
      data: { token: token, ...user },
      message: "Usuario creado exitosamente.",
    });
  } catch (e: any) {
    /* Envío de error cuando ya exista otro usuario registrado con el mismo correo*/
    if (e.code == 11000)
      res.status(500).json({
        success: false,
        message:
          "Ya existe un usuario registrado con ese correo electrónico, ingrese uno diferente e intente nuevamente.",
      });

    /* Envío de cualquier otro error */
    res.status(500).json({ success: false, message: e.errmsg });
  }
};

export const profile = async (req: Request, res: Response) => {
  const token = req.cookies.jwtToken;
  if (!token) return res.status(401).json({ success: true, data: false });
  const data = jwt.decode(token, {
    json: true,
  });

  if (!data || !data.id)
    return res
      .status(401)
      .json({
        success: false,
        message: "Lo sentimos, no se ha encontrado el usuario.",
      });

  const user = await User.findById(data.id);
  if (!user)
    return res
      .status(401)
      .json({
        success: false,
        message: "Lo sentimos, no se ha encontrado el usuario.",
      });

  res.status(200).json({
    success: true,
    data: {
      fullname: `${user.name} ${user.lastname}`.trim(),
      email: user.email,
    },
  });
};
