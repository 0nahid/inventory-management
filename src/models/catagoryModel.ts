import mongoose from "mongoose";
import CatagorySchema from "../Schema/catagorySchema";

export const CatagoryModel = mongoose.model("Catagory", CatagorySchema);
