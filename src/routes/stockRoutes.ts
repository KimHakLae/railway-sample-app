import { Router } from 'express';
import * as stockController from '../controllers/stockController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', stockController.getAllStocks);
router.get('/:id', stockController.getStockById);
router.post('/', stockController.createStock);
router.put('/:id', stockController.updateStock);
router.delete('/:id', stockController.deleteStock);
router.patch('/:id/urgent', stockController.toggleUrgent);

export default router;
