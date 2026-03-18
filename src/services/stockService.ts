import prisma from '../lib/prisma';
import { Stock, Ingredient, Storage } from '@prisma/client';

export type StockWithIngredient = Stock & { ingredient: Ingredient };

// 1. 전체 식재료 재고 조회 (Ingredient 정보 포함)
export const getAllStocks = async (): Promise<StockWithIngredient[]> => {
  return prisma.stock.findMany({
    include: { ingredient: true },
    orderBy: { entryDate: 'desc' },
  });
};

// 2. ID 기준 조회 (Ingredient 정보 포함)
export const getStockById = async (id: number): Promise<StockWithIngredient | null> => {
  return prisma.stock.findUnique({
    where: { id },
    include: { ingredient: true },
  });
};

// 3. 재고 생성
export const createStock = async (data: {
  userId: number;
  ingredientId: number;
  entryDate: string;
  expiryDate?: string;
  price?: number;
  quantity: number;
  is_urgent?: boolean;
  storage?: Storage;
}): Promise<StockWithIngredient> => {
  const created = await prisma.stock.create({
    data: {
      user_id: data.userId,
      ingredient_id: data.ingredientId,
      entryDate: new Date(data.entryDate),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      price: data.price ?? null,
      quantity: data.quantity,
      is_urgent: data.is_urgent ?? false,
      storage: data.storage
    },
    include: { ingredient: true },
  });
  return created;
};

// 4. 재고 수정
export const updateStock = async (id: number, data: {
  ingredientId?: number;
  entryDate?: string;
  expiryDate?: string;
  price?: number;
  quantity?: number;
  is_urgent?: boolean;
  userId?: number;
  storage?: Storage;
}): Promise<StockWithIngredient> => {
  const updated = await prisma.stock.update({
    where: { id },
    data: {
      ingredient_id: data.ingredientId,
      entryDate: data.entryDate ? new Date(data.entryDate) : undefined,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
      price: data.price,
      quantity: data.quantity,
      is_urgent: data.is_urgent,
      user_id: data.userId,
      storage: data.storage
    },
    include: { ingredient: true },
  });
  return updated;
};

// 5. 삭제
export const deleteStock = async (id: number): Promise<void> => {
  await prisma.stock.delete({ where: { id } });
};

// 6. 긴급 토글
export const toggleUrgentStock = async (id: number): Promise<StockWithIngredient> => {
  const stock = await prisma.stock.findUnique({
    where: { id },
    select: { is_urgent: true },
  });
  if (!stock) throw new Error("NOT_FOUND");

  const updated = await prisma.stock.update({
    where: { id },
    data: { is_urgent: !stock.is_urgent },
    include: { ingredient: true },
  });
  return updated;
};
