import type { Item } from "./item";

export type Storage = "R" | "F";
export interface Inventory {
  id: number;
  itemId: number;
  entryDate: string;
  expiryDate?: string;
  quantity: number;
  price?: number;
  is_urgent: boolean;
}

export interface InventoryWithItem {
  id: number;
  item: Item;
  storage: Storage;
  entryDate: string;
  expiryDate?: string;
  quantity: number;
  price?: number;
  is_urgent: boolean;
}