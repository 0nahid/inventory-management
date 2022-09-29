import { Request, Response } from "express";
import { Store } from "../models/storeModel";

// create a new store
const createStore = async (req: Request, res: Response) => {
  const store = await Store.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Store created successfully",
    data: store,
  });
};


export const storeRouter = {
  createStore,
};
