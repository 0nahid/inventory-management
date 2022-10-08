import mongoose from "mongoose";
import UserSchema, { IUser } from "../Schema/userSchema";

export const User = mongoose.model<IUser>("User", UserSchema);
