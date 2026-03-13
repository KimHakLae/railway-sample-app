import { Category, Item } from "@prisma/client";
import prisma from "../lib/prisma"

/** 전체 품목 조회 (재고 합산 정보 포함) */
export const getAllItems = async () => {
  const items = await prisma.item.findMany({
    include: {
      _count: {
        select: { inventories: true }
      },
      inventories: {
        select: {
          quantity: true
        }
      }
    },
    orderBy: { name: "asc" }
  })

  console.log(items)
  return items.map(item => ({
    ...item,
    totalQuantity: item.inventories.reduce((sum, inv) => sum + inv.quantity, 0),
    inventoryCount: item._count.inventories
  }))
}

/** 품목 등록 */
export const createItem = async (data: {
  name: string;
  category?: Category;
  version?: string;
}): Promise<Item> => {
  return await prisma.item.create({
    data: {
      name: data.name,
      category: data.category || "ETC",
      version: data.version
    }
  });
};

/** 품목 수정 */
export const updateItem = async (id: number, data: {
  name: string;
  category?: Category;
  version?: string;
}): Promise<Item> => {
  return await prisma.item.update({
    where: { id },
    data: {
      name: data.name,
      category: data.category,
      version: data.version
    }
  })
}

/** 품목 삭제 (재고가 있는 경우 차단) */
export const deleteItem = async (id: number): Promise<void> => {
  const inventoryCount = await prisma.inventory.count({
    where: { item_id: id }
  })

  if (inventoryCount > 0) {
    throw new Error("처리 불가: 해당 품목을 사용 중인 재고 데이터가 존재합니다.");
  }

  await prisma.item.delete({
    where: { id }
  })
}