import { Request, Response } from 'express';
import * as recipeService from '../services/recipeService';

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await recipeService.getRecipeById(Number(req.params.id));
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    
    const recipe = await recipeService.createRecipe({
      ...req.body,
      user_id: user.user_id
    });
    res.status(201).json(recipe);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await recipeService.updateRecipe(Number(req.params.id), req.body);
    res.json(recipe);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    await recipeService.deleteRecipe(Number(req.params.id));
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const recommendations = await recipeService.getRecommendedRecipes(user.user_id);
    res.json(recommendations);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const cookRecipe = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    await recipeService.consumeIngredients(user.user_id, Number(req.params.id));
    res.status(200).json({ message: 'Ingredients consumed successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
