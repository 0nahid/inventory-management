import mongoose from "mongoose";
import CatagorySchema from "../Schema/catagorySchema";

export const catagoryModel = mongoose.model("Catagory", CatagorySchema);
