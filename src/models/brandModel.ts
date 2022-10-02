import mongoose from "mongoose";
import BrandSchema from "../Schema/brandSchema";

export const BrandModel = mongoose.model("Brand", BrandSchema);
