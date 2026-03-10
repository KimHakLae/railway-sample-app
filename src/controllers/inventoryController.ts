import { Request, Response } from 'express';
import * as inventoryService from '../services/inventoryService';

export const getAllInventorys = async (req: Request, res: Response) => {
  try {
    const items = await inventoryService.getAllInventorys();
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getInventoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const item = await inventoryService.getInventoryById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createInventory = async (req: Request, res: Response) => {
  try {
    const newItem = await inventoryService.createInventory(req.body);
    res.status(201).json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updatedItem = await inventoryService.updateInventory(id, req.body);
    res.json(updatedItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteInventory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await inventoryService.deleteInventory(id);
    res.json({ message: 'Deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};