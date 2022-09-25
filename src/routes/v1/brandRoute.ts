import { Router } from "express";
import { brandRouter } from "../../controllers/brandController";
const router: Router = Router();

// router.get("/", brandRouter.getAllBrand);
// router.post("/", brandRouter.createBrand);

/***
 * /api/v1/brand:
 *  get: returns all the brands
 * post: create a new brand
 * /api/v1/brand
 */

router.route("/").get(brandRouter.getAllBrand).post(brandRouter.createBrand);

export default router;
