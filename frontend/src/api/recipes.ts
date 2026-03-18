import type { Recipe, RecipeWithIngredients } from '../types/recipe';

const API_URL = '/api/recipes';

const authHeader = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
});

export const getRecipes = async (): Promise<Recipe[]> => {
  const res = await fetch(API_URL, { headers: authHeader() });
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
};

export const getRecipeById = async (id: number): Promise<RecipeWithIngredients> => {
  const res = await fetch(`${API_URL}/${id}`, { headers: authHeader() });
  if (!res.ok) throw new Error('Failed to fetch recipe detail');
  return res.json();
};

export const createRecipe = async (data: Partial<Recipe> & { ingredients?: { ingredientId: number; amount: string }[] }): Promise<RecipeWithIngredients> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create recipe');
  return res.json();
};

export const updateRecipe = async (id: number, data: Partial<Recipe> & { ingredients?: { ingredientId: number; amount: string }[] }): Promise<RecipeWithIngredients> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update recipe');
  return res.json();
};

export const deleteRecipe = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: authHeader()
  });
  if (!res.ok) throw new Error('Failed to delete recipe');
};

export const getRecommendations = async (): Promise<(RecipeWithIngredients & { score: number })[]> => {
  const res = await fetch(`${API_URL}/recommendations`, { headers: authHeader() });
  if (!res.ok) throw new Error('Failed to fetch recommendations');
  return res.json();
};

export const cookRecipe = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}/cook`, {
    method: 'POST',
    headers: authHeader()
  });
  if (!res.ok) throw new Error('Failed to consume ingredients');
};
