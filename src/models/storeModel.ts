import mongoose from "mongoose";
import StoreSchema from "../Schema/storeSchema";

export const StoreModel = mongoose.model("StoreModel", StoreSchema);
