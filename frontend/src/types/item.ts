export type Category = "VEG" | "FRUIT" | "SPICE" | "SAUCE" | "MEAT" | "SNACK" | "ETC";
export type Storage = "R" | "F";

export interface Item {
  id: number;
  name: string;
  category: Category;
  storage: Storage;
}