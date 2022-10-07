"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stockSchema_1 = __importDefault(require("../Schema/stockSchema"));
exports.StockModel = mongoose_1.default.model("Stock", stockSchema_1.default);
