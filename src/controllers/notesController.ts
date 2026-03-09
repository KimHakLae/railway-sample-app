import { Response } from "express"
import { AuthRequest } from "../middlewares/authMiddleware"
import * as noteService from "../services/notesService"

export const getNotes = async (req: AuthRequest, res: Response) => {
  const user_id = req.user!.id
  const notes = await noteService.getUserNotes(user_id)
  res.json(notes)
}

export const createNoteHandler = async (req: AuthRequest, res: Response) => {
  const user_id = req.user!.id
  const { title, content } = req.body

  if (!title) {
    return res.status(400).json({ message: "title required" })
  }

  const note = await noteService.createNote(user_id, title, content)
  res.status(201).json(note)
}

export const deleteNoteHandler = async (req: AuthRequest, res: Response) => {
  const user_id = req.user!.id
  const id = Number(req.params.id)

  await noteService.deleteNote(id, user_id)
  res.json({ message: "deleted" })
}