import mongoose from "mongoose";
import SupplierSchema from "../Schema/supplierSchema";

export const SupplierModel = mongoose.model("Supplier", SupplierSchema);
