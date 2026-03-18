import { Request, Response } from 'express';
import * as stockService from '../services/stockService';

export const getAllStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await stockService.getAllStocks();
    res.json(stocks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getStockById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const stock = await stockService.getStockById(id);
    if (!stock) return res.status(404).json({ error: 'Not found' });
    res.json(stock);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createStock = async (req: Request, res: Response) => {
  try {
    const newStock = await stockService.createStock(req.body);
    res.status(201).json(newStock);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updatedStock = await stockService.updateStock(id, req.body);
    res.json(updatedStock);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStock = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await stockService.deleteStock(id);
    res.json({ message: 'Deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleUrgent = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const result = await stockService.toggleUrgentStock(id)
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: "긴급 상태 변경 실패" })
  }
}
