import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey";

export const register = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed
    }
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error("존재하지 않는 계정입니다")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("비밀번호가 올바르지 않습니다")
  }

  // 🔥 인증 상태 체크
  if (user.auth_status !== "V") {
    const statusMessages: Record<string, string> = {
      P: "관리자 승인 대기중입니다.",
      F: "계정 인증이 거절되었습니다.",
      E: "인증이 만료되었습니다. 다시 신청해주세요.",
      R: "인증이 취소된 계정입니다.",
    }

    const message =
      statusMessages[user.auth_status] ??
      "계정 상태가 올바르지 않습니다."

    const err: any = new Error(message)
    err.statusCode = 403
    throw err
  }

  const token = jwt.sign(
    { 
      id: user.user_id,
      is_admin: user.is_admin
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};