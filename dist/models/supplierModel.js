"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const supplierSchema_1 = __importDefault(require("../Schema/supplierSchema"));
exports.SupplierModel = mongoose_1.default.model("Supplier", supplierSchema_1.default);
