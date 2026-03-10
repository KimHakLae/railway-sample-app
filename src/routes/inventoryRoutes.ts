// src/routes/inventoryRoutes.ts
import { Router } from "express";
import {
  getAllInventorys,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  toggleUrgent
} from "../controllers/inventoryController";

const router = Router();

router.get("/", getAllInventorys);
router.get("/:id", getInventoryById);
router.post("/", createInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);
router.patch("/:id/urgent", toggleUrgent)

export default router;