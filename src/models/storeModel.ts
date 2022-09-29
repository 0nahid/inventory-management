import mongoose from "mongoose";
import StoreSchema from "../Schema/storeSchema";

export const Store = mongoose.model("Store", StoreSchema);
