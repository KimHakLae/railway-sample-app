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

// 인증 요청 사용자 목록
router.get(
  "/notes",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    const notes = await prisma.note.findMany({
      include: {
        user: { select: { email: true } }
      },
      orderBy: { createdAt: "desc" }
    })

    res.json(notes)
  }
)

export default router