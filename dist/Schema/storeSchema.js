"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const StoreSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide a store name"],
        trim: true,
        unique: true,
        lowercase: true,
        maxLength: [100, "Store cannot be more than 100 characters"],
        enum: {
            values: [
                "dhaka",
                "chittagong",
                "khulna",
                "rajshahi",
                "barisal",
                "sylhet",
                "rangpur",
                "mymensingh",
            ],
            message: "Please select a valid store",
        },
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "User",
        },
    },
}, {
    timestamps: true,
});
exports.default = StoreSchema;
