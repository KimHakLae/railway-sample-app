import type { Ingredient } from "./ingredient";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface Recipe {
  id: number;
  title: string;
  description: string | null;
  instructions: string | null;
  difficulty: Difficulty;
  cookingTime: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeIngredient {
  id: number;
  recipe_id: number;
  ingredient_id: number;
  amount: string;
  ingredient: Ingredient;
}

export interface RecipeWithIngredients extends Recipe {
  ingredients: RecipeIngredient[];
}
