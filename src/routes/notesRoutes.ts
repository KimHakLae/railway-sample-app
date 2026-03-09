import { Router } from "express"
import * as controller from "../controllers/notesController"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = Router()

router.get("/", authMiddleware, controller.getNotes)
router.post("/", authMiddleware, controller.createNoteHandler)
router.delete("/:id", authMiddleware, controller.deleteNoteHandler)

export default router