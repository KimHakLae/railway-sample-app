import type { Recipe, RecipeWithIngredients } from '../types/recipe';

const API_URL = import.meta.env.VITE_API_URL || ""

export const getRecipes = async (): Promise<Recipe[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/recipes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("레시피 조회 실패");
  return res.json();
};

export const getRecipeById = async (id: number): Promise<RecipeWithIngredients> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/recipes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("레시피 상세 조회 실패");
  return res.json();
};

export const createRecipe = async (data: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("레시피 등록 실패");
  return res.json();
};

export const updateRecipe = async (id: number, data: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("레시피 수정 실패");
  return res.json();
};

export const deleteRecipe = async (id: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/recipes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("레시피 삭제 실패");
};

export const getRecommendations = async (): Promise<(RecipeWithIngredients & { score: number })[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/recipes/recommendations`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("추천 레시피 조회 실패");
  return res.json();
};

export const cookRecipe = async (id: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/recipes/${id}/cook`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "요리 처리 실패");
  }
};
