"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const CatagorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide a cataogry name"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    description: String,
    imgURL: {
        type: String,
        validate: [validator_1.default.isURL, "Please provide a valid image URL"],
    },
}, {
    timestamps: true,
});
exports.default = CatagorySchema;
