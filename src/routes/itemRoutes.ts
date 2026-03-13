import { Router } from "express"
import * as itemController from "../controllers/itemController"

const router = Router()

router.get("/", itemController.fetchItems)
router.post("/", itemController.createItem)
router.put("/:id", itemController.updateItem)
router.delete("/:id", itemController.deleteItem)

export default router