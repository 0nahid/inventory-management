"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplierController_1 = require("../../controllers/supplierController");
const router = (0, express_1.Router)();
router.get("/", supplierController_1.supplierRouter.getAllSupplier);
router.get("/:id", supplierController_1.supplierRouter.getSingleSupplier);
router.post("/", supplierController_1.supplierRouter.createSupplier);
exports.default = router;
