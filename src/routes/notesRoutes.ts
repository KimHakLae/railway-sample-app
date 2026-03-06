import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getNotes,
  getNote,
  createNote,
  deleteNote
} from "../controllers/notesController";

const router = Router();

router.get("/", authMiddleware, getNotes);
router.get("/:id", authMiddleware, getNote);
router.post("/", authMiddleware, createNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;