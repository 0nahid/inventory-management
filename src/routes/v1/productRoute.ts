import { Router } from "express";
import { productsRouter } from "../../controllers/productController";
const router: Router = Router();

router.get("/", productsRouter.getAllProducts);

export default router;
