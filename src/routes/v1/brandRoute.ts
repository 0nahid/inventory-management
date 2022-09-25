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

/***
 * /api/v1/brand/:id:
 * get: returns a single brand
 * patch: update a single brand
 */
router
  .route("/:id")
  .get(brandRouter.getSingleBrand)
  .patch(brandRouter.updateBrand);

export default router;
