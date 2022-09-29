import { Schema } from "mongoose";
import validator from "validator";
const ObjectId = Schema.Types.ObjectId;

const CatagorySchema = new Schema(
  {
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
      validate: [validator.isURL, "Please provide a valid image URL"],
    },
  },
  {
    timestamps: true,
  }
);

export default CatagorySchema;
