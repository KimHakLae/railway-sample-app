import { Request, Response } from "express"
import * as itemService from "../services/itemService"

/** 모든 품목 조회 */
export const fetchItems = async (req: Request, res: Response) => {
  try {
    const items = await itemService.getAllItems()
    res.json(items)
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch items" })
  }
}

/** 품목 등록 */
export const createItem = async (req: Request, res: Response) => {
  try {
    const newItem = await itemService.createItem(req.body);
    res.status(201).json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/** 품목 수정 */
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updated = await itemService.updateItem(Number(id), req.body)
    res.json(updated)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

/** 품목 삭제 */
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await itemService.deleteItem(Number(id))
    res.status(204).send()
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}