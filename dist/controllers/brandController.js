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
exports.brandRouter = void 0;
const brandModel_1 = require("../models/brandModel");
/* for get all the users */
const getAllBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield brandModel_1.BrandModel.find().select("-products -suppliers -__v");
        // const brands = await BrandModel.find();
        res.status(200).send({
            message: "All brands",
            status: 200,
            data: brands,
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
const getSingleBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const brand = await BrandModel.findById(req.params.id);
        const filter = { _id: req.params.id };
        const brand = yield brandModel_1.BrandModel.findOne(filter)
            .populate("products")
            .populate("suppliers.id")
            .select(" -__v");
        if (!brand) {
            res.status(404).send({
                message: "Brand not found",
                status: 404,
            });
        }
        else {
            res.status(200).send({
                message: "Brand",
                status: 200,
                data: brand,
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
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brand = yield brandModel_1.BrandModel.create(req.body);
        res.status(201).send({
            message: "Brand created",
            status: 201,
            data: brand,
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
// update a brand
const updateBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brand = yield brandModel_1.BrandModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!brand) {
            res.status(404).send({
                message: "Brand not found",
                status: 404,
            });
        }
        else {
            res.status(200).send({
                message: "Brand updated",
                status: 200,
                data: brand,
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
exports.brandRouter = {
    getAllBrand,
    createBrand,
    getSingleBrand,
    updateBrand,
};
