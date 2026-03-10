import prisma from "../lib/prisma"

export const getAllItems = async () => {
  return await prisma.item.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      storage: true,
    },
    orderBy: { name: "asc" }
  })
}