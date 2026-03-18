import { Router } from "express";
import * as ingredientController from "../controllers/ingredientController";

const router = Router();

router.get("/", ingredientController.fetchIngredients);
router.post("/", ingredientController.createIngredient);
router.put("/:id", ingredientController.updateIngredient);
router.delete("/:id", ingredientController.deleteIngredient);

export default router;
