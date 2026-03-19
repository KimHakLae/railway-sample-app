import { Router } from "express";
import * as ingredientController from "../controllers/ingredientController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", ingredientController.fetchIngredients);
router.post("/", authMiddleware, ingredientController.createIngredient);
router.put("/:id", authMiddleware, ingredientController.updateIngredient);
router.delete("/:id", authMiddleware, ingredientController.deleteIngredient);

export default router;
