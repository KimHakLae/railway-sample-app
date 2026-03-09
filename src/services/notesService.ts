import prisma from "../lib/prisma"

export const getUserNotes = async (user_id: number) => {
  return prisma.note.findMany({
    where: { user_id },
    orderBy: { createdAt: "desc" }
  })
}

export const createNote = async (
  user_id: number,
  title: string,
  content?: string
) => {
  return prisma.note.create({
    data: { user_id, title, content }
  })
}

export const deleteNote = async (id: number, user_id: number) => {
  return prisma.note.delete({
    where: { id },
  })
}