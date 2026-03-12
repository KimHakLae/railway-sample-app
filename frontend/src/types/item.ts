export type Category = "VEG" | "FRUIT" | "SPICE" | "SAUCE" | "MEAT" | "SNACK" | "FOOD" | "FROZEN_FOOD" | "ETC";

export interface Item {
  id: number;
  name: string;
  category: Category;
}