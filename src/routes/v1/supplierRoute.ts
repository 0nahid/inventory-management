import { Router } from "express";
import { supplierRouter } from "../../controllers/supplierController";
const router: Router = Router();

router.get("/", supplierRouter.getAllSupplier);
router.get("/:id", supplierRouter.getSingleSupplier);
router.post("/", supplierRouter.createSupplier);
export default router;
