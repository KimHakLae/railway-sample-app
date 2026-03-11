import { Router } from "express"
import * as itemController from "../controllers/itemController"

const router = Router()

router.get("/", itemController.fetchItems)
router.post("/", itemController.createIitem)

export default router