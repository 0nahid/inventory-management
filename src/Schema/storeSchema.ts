import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;
const StoreSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default StoreSchema;
