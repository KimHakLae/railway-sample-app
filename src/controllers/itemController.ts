import { Request, Response } from "express"
import * as itemService from "../services/itemSErvice"

export const fetchItems = async (req: Request, res: Response) => {
  try {
    const items = await itemService.getAllItems()
    res.json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch items" })
  }
}