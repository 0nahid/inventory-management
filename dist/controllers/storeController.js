"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRouter = void 0;
const storeModel_1 = require("../models/storeModel");
// create a new store
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeModel_1.Store.create(req.body);
        res.status(201).json({
            status: "success",
            message: "Store created",
            data: store,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
// get all stores
const getAllStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield storeModel_1.Store.find();
    res.status(200).json({
        status: "success",
        message: "All stores",
        data: stores,
    });
});
// get single store
const getSingleStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeModel_1.Store.findById(req.params.id);
        if (!store) {
            res.status(404).json({
                status: "fail",
                message: "Store not found",
            });
        }
        else {
            res.status(200).json({
                status: "success",
                message: "Single store",
                data: store,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
exports.storeRouter = {
    createStore,
    getAllStores,
    getSingleStore,
};
