"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatagoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const catagorySchema_1 = __importDefault(require("../Schema/catagorySchema"));
exports.CatagoryModel = mongoose_1.default.model("Catagory", catagorySchema_1.default);
