export type Category = 
  | "VEGETABLE" 
  | "MEAT" 
  | "FRUIT" 
  | "SEAFOOD" 
  | "DAIRY" 
  | "GRAIN" 
  | "ETC";

export interface Ingredient {
  id: number;
  name: string;
  category: Category;
  version?: string;
  totalQuantity?: number;
  stockCount?: number;
}
