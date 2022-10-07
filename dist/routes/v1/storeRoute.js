"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storeController_1 = require("../../controllers/storeController");
const router = (0, express_1.Router)();
router.post("/", storeController_1.storeRouter.createStore);
router.get("/", storeController_1.storeRouter.getAllStores);
router.get("/:id", storeController_1.storeRouter.getSingleStore);
exports.default = router;
