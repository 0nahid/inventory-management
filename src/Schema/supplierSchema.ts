import { Schema } from "mongoose";
import validator from "validator";
const ObjectId = Schema.Types.ObjectId;
const SupplierSchema = new Schema(
  {
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
      validate: [validator.isEmail, "Please provide a valid email"],
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
          validator.isMobilePhone,
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
        validator.isMobilePhone,
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
      validate: [validator.isURL, "Please provide a valid image url"],
    },
    nationalIdentityImage: {
      type: String,
      required: true,
      validate: [validator.isURL, "Please provide a valid image url"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "discounted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default SupplierSchema;
