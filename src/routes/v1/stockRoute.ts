import { Router } from "express";
import { stockRouter } from "../../controllers/stockController";
const router: Router = Router();

router.route("/").post(stockRouter.createStock).get(stockRouter.getAllStock);


export default router;
