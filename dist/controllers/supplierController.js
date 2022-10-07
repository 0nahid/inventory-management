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
exports.supplierRouter = void 0;
const brandModel_1 = require("../models/brandModel");
const supplierModel_1 = require("../models/supplierModel");
/* for get all the users */
const getAllSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suppliers = yield supplierModel_1.SupplierModel.find().select("-products -brands -__v");
        // const brands = await BrandModel.find();
        res.status(200).send({
            message: "All suppliers",
            status: 200,
            data: suppliers,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            status: 500,
            error: error,
        });
    }
});
const getSingleSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const brand = await BrandModel.findById(req.params.id);
        const filter = { _id: req.params.id };
        const supplier = yield supplierModel_1.SupplierModel.findOne(filter);
        if (!supplier) {
            res.status(404).send({
                message: "Supplier not found",
                status: 404,
            });
        }
        else {
            res.status(200).send({
                message: "Supplier",
                status: 200,
                data: supplier,
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            status: 500,
            error: error,
        });
    }
});
// create a new brand
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplier = yield supplierModel_1.SupplierModel.create(req.body);
        /**
         * add the supplier to the brand
         */
        console.log(`supplierId:`, supplier.id);
        console.log(`filter`, req.body.brand.id);
        const { _id: supplierId, brand } = supplier;
        yield brandModel_1.BrandModel.updateOne({ _id: brand === null || brand === void 0 ? void 0 : brand.id }, { $push: { suppliers: supplierId } });
        res.status(201).send({
            message: "Supplier created",
            status: 201,
            data: supplier,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            status: 500,
            error: error,
        });
    }
});
exports.supplierRouter = {
    getAllSupplier,
    getSingleSupplier,
    createSupplier,
};
