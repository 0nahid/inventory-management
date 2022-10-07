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
exports.productsRouter = void 0;
const brandModel_1 = require("../models/brandModel");
const productModel_1 = require("../models/productModel");
// create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.ProductModel.create(req.body);
        const { _id: productId, brand } = product;
        // update the brand with the product id
        yield brandModel_1.BrandModel.updateOne({ _id: brand === null || brand === void 0 ? void 0 : brand.id }, { $push: { products: productId } });
        res.status(201).json({
            status: "success",
            message: "Product created",
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
// get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.ProductModel.find();
    res.status(200).json({
        status: "success",
        message: "All products",
        data: products,
    });
});
// file upload
const uploadProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: "success",
            message: "Image uploaded",
            data: req.files,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
exports.productsRouter = {
    createProduct,
    getAllProducts,
    uploadProductImage,
};
