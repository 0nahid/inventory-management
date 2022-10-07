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
exports.stockRouter = void 0;
const stockSchema_1 = require("../models/stockSchema");
// create a new stock
const createStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stock = yield stockSchema_1.StockModel.create(req.body);
        res.status(201).json({
            status: "success",
            message: "Stock created",
            data: stock,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
// get all stock
const getAllStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let filters = Object.assign({}, req.query);
    // operators
    let queryStr = JSON.stringify(filters);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));
    filters = JSON.parse(queryStr);
    // exclude the page and limit from the query
    const excludedFields = ["page", "limit", "sort"];
    excludedFields.forEach((field) => delete filters[field]);
    // build the query
    let queries = {};
    if (req.query.sort) {
        const sortBy = req.query.sort.toString().split(",").join(" ");
        queries.sortBy = sortBy;
    }
    // console.log(queries.sortBy);
    if (req.query.fields) {
        const fields = req.query.fields.toString().split(",").join(" ");
        queries.fields = fields;
    }
    // pagination logic
    const { page, limit } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    queries.skip = skip;
    queries.limit = limitNumber;
    // console.log(queries);
    try {
        const stock = yield stockSchema_1.StockModel.find(Object.assign({}, filters));
        res.status(200).json({
            status: "success",
            message: "All Stock",
            data: stock,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
// get a single stock
const getSingleStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stock = yield stockSchema_1.StockModel.findById(req.params.id)
            .populate("brand.id")
            .populate("suppiliedBy.id")
            .populate("store.id");
        // const id: ids = req.params.id;
        //  pipeline => aggregation framework
        // const stock = await StockModel.aggregate([
        //   { $match: { _id: id } },
        //   {
        //     $lookup: {
        //       from: "brands",
        //       localField: "brand.id",
        //       foreignField: "_id",
        //       as: "brand",
        //     },  
        //   },
        // ]);
        console.log(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Single Stock",
            data: stock,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
});
exports.stockRouter = {
    createStock,
    getAllStock,
    getSingleStock,
};
