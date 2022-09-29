import { Request, Response } from "express";
import { Store } from "../models/storeModel";

// create a new store
const createStore = async (req: Request, res: Response) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Store created",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// get all stores
const getAllStores = async (req: Request, res: Response) => {
  const stores = await Store.find();
  res.status(200).json({
    status: "success",
    message: "All stores",
    data: stores,
  });
};

// get single store
const getSingleStore = async (req: Request, res: Response) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      res.status(404).json({
        status: "fail",
        message: "Store not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Single store",
        data: store,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const storeRouter = {
  createStore,
  getAllStores,
  getSingleStore,
};
