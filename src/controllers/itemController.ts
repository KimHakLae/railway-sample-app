import { Request, Response } from "express"
import * as itemService from "../services/itemService"

export const fetchItems = async (req: Request, res: Response) => {
  try {
    const items = await itemService.getAllItems()
    res.json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch items" })
  }
}

export const createIitem = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const newItem = await itemService.createItem(req.body);
    res.status(201).json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};