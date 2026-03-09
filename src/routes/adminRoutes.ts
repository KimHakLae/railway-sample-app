import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import prisma from "../lib/prisma"

const router = Router()

// 관리자 권한 체크 미들웨어
const adminOnly = (req: any, res: any, next: any) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Admin only" })
  }
  next()
}

// 사용자 목록
router.get("/users", authMiddleware, adminOnly, async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      user_id: true,
      email: true,
      auth_status: true,
      is_admin: true,
    },
    orderBy: { user_id: "desc" }
  })

  res.json(users)
})

// 사용자 승인 처리
router.patch("/users/:id/approve", authMiddleware, adminOnly, async (req, res) => {
  const user_id = Number(req.params.id)

  await prisma.user.update({
    where: { user_id },
    data: { auth_status: "V" }
  })

  res.json({ message: "승인 완료" })
})

// 사용자 거절 처리
router.patch("/users/:id/reject", authMiddleware, adminOnly, async (req, res) => {
  const user_id = Number(req.params.id)

  await prisma.user.update({
    where: { user_id },
    data: { auth_status: "F" }
  })

  res.json({ message: "거절 완료" })
})

export default router