// inventoryService.ts
import prisma from '../lib/prisma';
import { Inventory, Item, Storage } from '@prisma/client';

export type InventoryWithItem = Inventory & { item: Item };

// 1. 전체 재고 조회 (Item 정보 포함)
export const getAllInventorys = async (): Promise<InventoryWithItem[]> => {
  return prisma.inventory.findMany({
    include: { item: true },
    orderBy: { entryDate: 'desc' },
  });
};

// 2. ID 기준 조회 (Item 정보 포함)
export const getInventoryById = async (id: number): Promise<InventoryWithItem | null> => {
  return prisma.inventory.findUnique({
    where: { id },
    include: { item: true },
  });
};

// 3. 재고 생성
export const createInventory = async (data: {
  userId: number;
  itemId: number;
  entryDate: string;
  expiryDate?: string;
  price?: number;
  quantity: number;
  is_urgent?: boolean;
  storage?: Storage;
}): Promise<InventoryWithItem> => {
  const created = await prisma.inventory.create({
    data: {
      user_id: data.userId,
      item_id: data.itemId,
      entryDate: new Date(data.entryDate),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      price: data.price ?? null,
      quantity: data.quantity,
      is_urgent: data.is_urgent ?? false,
      storage: data.storage
    },
    include: { item: true },
  });
  return created;
};

// 4. 재고 수정
export const updateInventory = async (id: number, data: {
  itemId?: number;
  entryDate?: string;
  expiryDate?: string;
  price?: number;
  quantity?: number;
  is_urgent?: boolean;
  userId?: number;
  storage?: Storage;
}): Promise<InventoryWithItem> => {
  const updated = await prisma.inventory.update({
    where: { id },
    data: {
      item_id: data.itemId,
      entryDate: data.entryDate ? new Date(data.entryDate) : undefined,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
      price: data.price,
      quantity: data.quantity,
      is_urgent: data.is_urgent,
      user_id: data.userId,
      storage: data.storage
    },
    include: { item: true },
  });
  return updated;
};

// 5. 삭제
export const deleteInventory = async (id: number): Promise<void> => {
  await prisma.inventory.delete({ where: { id } });
};

// 6. 긴급 토글
export const toggleUrgentInventory = async (id: number): Promise<InventoryWithItem> => {
  const inventory = await prisma.inventory.findUnique({
    where: { id },
    select: { is_urgent: true },
  });
  if (!inventory) throw new Error("NOT_FOUND");

  const updated = await prisma.inventory.update({
    where: { id },
    data: { is_urgent: !inventory.is_urgent },
    include: { item: true },
  });
  return updated;
};