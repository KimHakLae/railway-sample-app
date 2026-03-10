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
  price?: number;
  category: Category; // enum 타입으로 변경
  storage: Storage;   // enum 타입으로 변경
}): Promise<Inventory> => {
  return prisma.inventory.create({
    data: {
      ...data,
      entryDate: new Date(data.entryDate),
    },
  });
};

export const updateInventory = async (id: number, data: {
  name?: string;
  entryDate?: string;
  price?: number;
  category: Category; // enum 타입으로 변경
  storage: Storage;   // enum 타입으로 변경
}): Promise<Inventory> => {
  return prisma.inventory.update({
    where: { id },
    data: {
      ...data,
      entryDate: data.entryDate ? new Date(data.entryDate) : undefined,
    },
  });
};

export const deleteInventory = async (id: number): Promise<void> => {
  await prisma.inventory.delete({ where: { id } });
};