"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"],
        minLength: [3, "Product name cannot be less than 3 characters"],
        unique: true, // unique
    },
    description: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag", "box", "dozen"],
            message: "Please select the correct unit for product, it must be either kg or litre or pcs or bag or box or dozen",
        },
    },
    imageUrls: {
        type: [String],
        // required: true,
        validate: {
            // get the value of the imageUrls field by loop and validate it using validator.isURL
            validator: function (v) {
                for (let i = 0; i < v.length; i++) {
                    if (!validator_1.default.isURL(v[i])) {
                        return false;
                    }
                }
                return true;
            },
            message: "Please provide a valid image URL",
        },
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            require: true,
        },
    },
}, {
    timestamps: true,
});
exports.default = productSchema;
