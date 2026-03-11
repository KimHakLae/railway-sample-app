export type Category = "VEG" | "FRUIT" | "SPICE" | "SAUCE" | "MEAT" | "SNACK" | "ETC";

export interface Item {
  id: number;
  name: string;
  category: Category;
}