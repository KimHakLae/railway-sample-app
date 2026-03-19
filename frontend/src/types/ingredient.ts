export type Category = 
  | "VEG" 
  | "FRUIT" 
  | "SPICE" 
  | "SAUCE" 
  | "MEAT" 
  | "DAIRY" 
  | "GRAIN" 
  | "SNACK" 
  | "FOOD" 
  | "FROZEN_FOOD" 
  | "ETC";

export interface Ingredient {
  id: number;
  name: string;
  category: Category;
  version?: string;
  totalQuantity?: number;
  stockCount?: number;
}
