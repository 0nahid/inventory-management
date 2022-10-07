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
exports.catagoryRouter = void 0;
const catagoryModel_1 = require("../models/catagoryModel");
// create
const createCatagory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const catagory = yield catagoryModel_1.CatagoryModel.create(req.body);
        res.status(201).send({
            message: "Catagory created",
            status: 201,
            data: catagory,
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
// get all
const getAllCatagory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const catagories = yield catagoryModel_1.CatagoryModel.find().select("-__v");
        res.status(200).send({
            message: "All catagories",
            status: 200,
            data: catagories,
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
// get single
const getSingleCatagory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: req.params.id };
        const catagory = yield catagoryModel_1.CatagoryModel.findOne(filter);
        if (!catagory) {
            res.status(404).send({
                message: "Catagory not found",
                status: 404,
            });
        }
        else {
            res.status(200).send({
                message: "Catagory",
                status: 200,
                data: catagory,
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
exports.catagoryRouter = {
    getAllCatagory,
    getSingleCatagory,
    createCatagory,
};
