import { Request, Response } from "express";
import * as authService from "../services/authService";
import prisma from "../lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SALT_ROUNDS = 10

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // 1️⃣ 이메일 존재 여부 확인
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." })
    }

    // 2️⃣ 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    // 3️⃣ 신규 유저 생성
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        auth_status: "P", // 기본 인증 상태: Pending
        is_admin: false
      }
    })

    return res.status(201).json({ message: "회원가입 성공", user: { id: newUser.user_id, email: newUser.email } })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "서버 에러" })
  }
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