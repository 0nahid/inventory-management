import { Schema } from "mongoose";
import validator from "validator";
const ObjectId = Schema.Types.ObjectId;
const stockSchema = new Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true, // trim whitespace
      maxLength: [100, "Product name cannot exceed 100 characters"],
      minLength: [3, "Product name cannot be less than 3 characters"],
      // unique: true, // unique
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
        message:
          "Please select the correct unit for product, it must be either kg or litre or pcs or bag or box or dozen",
      },
    },
    imageUrls: {
      type: [String],
      required: true,
      validate: {
        // get the value of the imageUrls field by loop and validate it using validator.isURL
        validator: function (v: string[]) {
          for (let i = 0; i < v.length; i++) {
            if (!validator.isURL(v[i])) {
              return false;
            }
          }
          return true;
        },
        message: "Please provide a valid image URL",
      },
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product Price Cannot be less than 0"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product Quantity Cannot be less than 0"],
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
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discounted"],
        message:
          "Please select the correct status for product, it must be either in-stock or out-of-stock or discounted",
      },
      default: "active",
    },
    store: {
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
      id: {
        type: ObjectId,
        ref: "Store",
        require: true,
      },
    },
    suppiliedBy: {
      name: {
        type: String,
        required: [true, "Please provide a supplier name"],
        lowercase: true,
        trim: true,
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
        require: true,
      },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: [0, "Sell Count Cannot be less than 0"],
    },
  },
  {
    timestamps: true,
  }
);

export default stockSchema;
