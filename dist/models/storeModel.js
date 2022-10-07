"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const storeSchema_1 = __importDefault(require("../Schema/storeSchema"));
exports.Store = mongoose_1.default.model("Store", storeSchema_1.default);
