import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export interface AuthRequest extends Request {
  user?: { id: number }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: "No token" })

  const token = auth.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    req.user = { id: decoded.id }
    next()
  } catch {
    res.status(401).json({ message: "Invalid token" })
  }
}