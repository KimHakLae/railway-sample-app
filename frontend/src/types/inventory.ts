import type { Item } from "./item";

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
  entryDate: string;
  expiryDate?: string;
  quantity: number;
  price?: number;
  is_urgent: boolean;
}