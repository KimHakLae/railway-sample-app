import { Router } from 'express';
import * as recipeController from '../controllers/recipeController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', recipeController.getAllRecipes);
router.get('/recommendations', recipeController.getRecommendations);
router.get('/:id', recipeController.getRecipeById);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
router.post('/:id/cook', recipeController.cookRecipe);

export default router;
