import { Router } from "express";
import { productsRouter } from "../../controllers/productController";
import { uploader } from "../../middlewares/uploader";
const router: Router = Router();

router.get("/", productsRouter.getAllProducts);
router.post("/", productsRouter.createProduct);

router.post(
  "/upload",
  uploader.array("image"),
  productsRouter.uploadProductImage
);

export default router;
