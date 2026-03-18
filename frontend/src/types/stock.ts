import type { Ingredient } from "./ingredient";

export type Storage = "FRIDGE" | "FREEZER" | "ROOM";

export interface Stock {
  id: number;
  user_id: number;
  ingredient_id: number;
  entryDate: string;
  expiryDate: string | null;
  price: number | null;
  quantity: number;
  is_urgent: boolean;
  storage: Storage;
  ingredient: Ingredient;
}

export type StockWithIngredient = Stock;
