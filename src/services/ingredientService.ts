import { Category, Ingredient } from "@prisma/client";
import prisma from "../lib/prisma"

/** 전체 식재료 종류 조회 (재고 합산 정보 포함) */
export const getAllIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany({
    include: {
      _count: {
        select: { stocks: true }
      },
      stocks: {
        select: {
          quantity: true
        }
      }
    },
    orderBy: { name: "asc" }
  })

  return ingredients.map(ing => ({
    ...ing,
    totalQuantity: ing.stocks.reduce((sum, stock) => sum + stock.quantity, 0),
    stockCount: ing._count.stocks
  }))
}

/** 식재료 종류 등록 */
export const createIngredient = async (data: {
  name: string;
  category?: Category;
  version?: string;
}): Promise<Ingredient> => {
  return await prisma.ingredient.create({
    data: {
      name: data.name,
      category: data.category || "ETC",
      version: data.version
    }
  });
};

/** 식재료 종류 수정 */
export const updateIngredient = async (id: number, data: {
  name: string;
  category?: Category;
  version?: string;
}): Promise<Ingredient> => {
  return await prisma.ingredient.update({
    where: { id },
    data: {
      name: data.name,
      category: data.category,
      version: data.version
    }
  })
}

/** 식재료 종류 삭제 (재고가 있는 경우 차단) */
export const deleteIngredient = async (id: number): Promise<void> => {
  const stockCount = await prisma.stock.count({
    where: { ingredient_id: id }
  })

  if (stockCount > 0) {
    throw new Error("처리 불가: 해당 식재료를 사용 중인 재고 데이터가 존재합니다.");
  }

  await prisma.ingredient.delete({
    where: { id }
  })
}
