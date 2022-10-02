import mongoose from "mongoose";
import stockSchema from "../Schema/stockSchema";

export const StockModel = mongoose.model("Stock", stockSchema);

