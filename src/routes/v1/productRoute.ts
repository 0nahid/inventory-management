import { Router } from "express";
import { productsRouter } from "../../controllers/productController";
import { uploader } from "../../middlewares/uploader";
import { verifyManager } from "../../middlewares/verifyManager";
import { verifyToken } from "../../middlewares/verifyToken";

const router: Router = Router();

router.get("/", productsRouter.getAllProducts);
router.post("/", verifyToken, verifyManager, productsRouter.createProduct);

router.post(
  "/upload",
  uploader.array("image"),
  productsRouter.uploadProductImage
);

export default router;
