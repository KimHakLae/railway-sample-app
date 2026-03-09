import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  console.log(req.body);   // 추가
  const { email, password } = req.body;

  const user = await authService.register(email, password);

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password)
    res.json(token)
  } catch (err: any) {
    res.status(err.statusCode || 400).json({
      message: err.message
    })
  }
};