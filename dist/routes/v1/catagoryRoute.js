"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catagoryController_1 = require("../../controllers/catagoryController");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(catagoryController_1.catagoryRouter.getAllCatagory)
    .post(catagoryController_1.catagoryRouter.createCatagory);
router.get("/id", catagoryController_1.catagoryRouter.getSingleCatagory);
exports.default = router;
