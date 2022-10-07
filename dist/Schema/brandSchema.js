"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const BrandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        maxLength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email"],
    },
    website: {
        type: String,
        validate: [validator_1.default.isURL, "Please provide a valid website"],
    },
    location: String,
    products: [
        {
            type: ObjectId,
            ref: "Product",
        },
    ],
    suppliers: [
        {
            name: String,
            contactNumber: String,
            id: {
                type: ObjectId,
                ref: "Supplier",
            },
        },
    ],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}, {
    timestamps: true,
});
exports.default = BrandSchema;
