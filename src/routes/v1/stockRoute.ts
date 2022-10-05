import { Router } from "express";
import { stockRouter } from "../../controllers/stockController";
const router: Router = Router();

router.route("/").post(stockRouter.createStock);

export default router;
