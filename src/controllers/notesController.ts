import { Request, Response } from "express";
import * as notesService from "../services/notesService";

export const getNotes = async (req: Request, res: Response) => {
  const notes = await notesService.getAllNotes();
  res.json(notes);
};

export const getNote = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const note = await notesService.getNoteById(id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const note = await notesService.createNote(title, content);

  res.status(201).json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await notesService.deleteNote(id);

  res.json({ message: "Deleted" });
};