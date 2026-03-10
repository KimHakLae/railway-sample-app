import { Router } from "express"
import * as itemController from "../controllers/itemController"

const router = Router()

router.get("/", itemController.fetchItems)

export default router