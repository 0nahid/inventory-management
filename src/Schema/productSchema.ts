import { Schema } from "mongoose";
import validator from "validator";
const { ObjectId } = Schema.Types;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true, // trim whitespace
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
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // supplier: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // catagories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export default productSchema;
