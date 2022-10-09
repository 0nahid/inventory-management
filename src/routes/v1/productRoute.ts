import { Router } from "express";
import { productsRouter } from "../../controllers/productController";
import { authorization } from "../../middlewares/authorization";
import { uploader } from "../../middlewares/uploader";
import { verifyToken } from "../../middlewares/verifyToken";

const router: Router = Router();

router.get("/", productsRouter.getAllProducts);
router.post(
  "/",
  verifyToken,
  authorization(["admin","store-manager"]),
  productsRouter.createProduct
);

router.post(
  "/upload",
  uploader.array("image"),
  productsRouter.uploadProductImage
);

export default router;
