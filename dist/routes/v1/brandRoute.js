"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brandController_1 = require("../../controllers/brandController");
const router = (0, express_1.Router)();
// router.get("/", brandRouter.getAllBrand);
// router.post("/", brandRouter.createBrand);
/***
 * /api/v1/brand:
 *  get: returns all the brands
 * post: create a new brand
 * /api/v1/brand
 */
router.route("/").get(brandController_1.brandRouter.getAllBrand).post(brandController_1.brandRouter.createBrand);
/***
 * /api/v1/brand/:id:
 * get: returns a single brand
 * patch: update a single brand
 */
router
    .route("/:id")
    .get(brandController_1.brandRouter.getSingleBrand)
    .patch(brandController_1.brandRouter.updateBrand);
exports.default = router;
