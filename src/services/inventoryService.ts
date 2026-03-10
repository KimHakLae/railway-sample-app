import prisma from '../lib/prisma';
import { Category, Storage, Inventory } from '@prisma/client';

export const getAllInventorys = async (): Promise<Inventory[]> => {
  return prisma.inventory.findMany();
};

export const getInventoryById = async (id: number): Promise<Inventory | null> => {
  return prisma.inventory.findUnique({ where: { id } });
};

export const createInventory = async (data: {
  name: string;
  entryDate: string;
  expiryDate?: string;
  price?: number;
  quantity: number;
  category: Category; // enum 타입으로 변경
  storage: Storage;   // enum 타입으로 변경
  is_urgent: boolean;
}): Promise<Inventory> => {
  return prisma.inventory.create({
    data: {
      ...data,
      price: Number(data.price) || null,
      entryDate: new Date(data.entryDate),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null, // ✅
    },
  });
};

export const updateInventory = async (id: number, data: {
  name: string;
  entryDate: string;
  expiryDate?: string;
  price?: number;
  quantity: number;
  category: Category; // enum 타입으로 변경
  storage: Storage;   // enum 타입으로 변경
  is_urgent: boolean;
}): Promise<Inventory> => {
  return prisma.inventory.update({
    where: { id },
    data: {
      ...data,
      price: Number(data.price) || null,
      entryDate: data.entryDate ? new Date(data.entryDate) : undefined,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null, // ✅
    },
  });
};

export const deleteInventory = async (id: number): Promise<void> => {
  await prisma.inventory.delete({ where: { id } });
};

export const toggleUrgent = async (id: number) => {
  // 현재 상태 조회
  const item = await prisma.inventory.findUnique({
    where: { id },
    select: { is_urgent: true },
  })

  if (!item) throw new Error("NOT_FOUND")

  // 토글 업데이트
  return prisma.inventory.update({
    where: { id },
    data: { is_urgent: !item.is_urgent },
  })
}