import { Request, Response } from "express"
import * as ingredientService from "../services/ingredientService"

/** 모든 식재료 종류 조회 */
export const fetchIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await ingredientService.getAllIngredients()
    res.json(ingredients)
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch ingredients" })
  }
}

/** 식재료 종류 등록 */
export const createIngredient = async (req: Request, res: Response) => {
  try {
    const newIngredient = await ingredientService.createIngredient(req.body);
    res.status(201).json(newIngredient);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/** 식재료 종류 수정 */
export const updateIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updated = await ingredientService.updateIngredient(Number(id), req.body)
    res.json(updated)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

/** 식재료 종류 삭제 */
export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await ingredientService.deleteIngredient(Number(id))
    res.status(204).send()
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}
