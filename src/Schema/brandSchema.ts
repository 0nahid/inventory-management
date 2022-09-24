import { Schema } from "mongoose";
import validator from "validator";

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  website: {
    type: String,
    validate: [validator.isURL, "Please provide a valid website"],
  },
  
});
