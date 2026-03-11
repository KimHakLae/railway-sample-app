import { Category, Item } from "@prisma/client";
import prisma from "../lib/prisma"

export const getAllItems = async () => {
  return await prisma.item.findMany({
    select: {
      id: true,
      name: true,
      category: true,
    },
    orderBy: { name: "asc" }
  })
}

// 재고 항목 생성
export const createItem = async (data: {
  name: string;
  category?: Category;
}): Promise<Item> => {
  const created = await prisma.item.create({
    data: {
      name: data.name,
      category: data.category,
    }
  });
  return created;
};