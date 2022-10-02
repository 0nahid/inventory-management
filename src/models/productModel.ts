import mongoose from "mongoose";
import productSchema from "../Schema/productSchema";

export const ProductModel = mongoose.model("Product", productSchema);
