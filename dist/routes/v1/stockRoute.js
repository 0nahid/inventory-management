"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = require("../../controllers/stockController");
const router = (0, express_1.Router)();
router.route("/").post(stockController_1.stockRouter.createStock).get(stockController_1.stockRouter.getAllStock);
router.route("/:id").get(stockController_1.stockRouter.getSingleStock);
exports.default = router;
