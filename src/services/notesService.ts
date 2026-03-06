import prisma from "../lib/prisma";

export const getAllNotes = async () => {
  return prisma.note.findMany();
};

export const getNoteById = async (id: number) => {
  return prisma.note.findUnique({
    where: { id }
  });
};

export const createNote = async (title: string, content?: string) => {
  return prisma.note.create({
    data: { title, content }
  });
};

export const deleteNote = async (id: number) => {
  return prisma.note.delete({
    where: { id }
  });
};