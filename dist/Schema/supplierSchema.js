"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const SupplierSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        maxLength: [30, "Name cannot be more than 100 characters"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email"],
    },
    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
        },
    },
    contactNumber: [
        {
            type: String,
            required: true,
            validate: [
                validator_1.default.isMobilePhone,
                "Please provide a valid contact number",
            ],
        },
    ],
    emergencyNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [
            validator_1.default.isMobilePhone,
            "Please provide a valid phone number",
        ],
    },
    tradeLicense: {
        type: Number,
        required: [true, "Please provide a trade license number"],
    },
    presentAddress: {
        type: String,
        required: true,
        trim: true,
    },
    permanentAddress: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
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
            message: "Please select a valid location",
        },
    },
    profileImage: {
        type: String,
        required: true,
        validate: [validator_1.default.isURL, "Please provide a valid image url"],
    },
    nationalIdentityImage: {
        type: String,
        required: true,
        validate: [validator_1.default.isURL, "Please provide a valid image url"],
    },
    status: {
        type: String,
        enum: ["active", "inactive", "discounted"],
        default: "active",
    },
}, {
    timestamps: true,
});
exports.default = SupplierSchema;
