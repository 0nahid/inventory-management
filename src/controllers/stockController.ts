import { Request, Response } from "express";
import { StockModel } from "../models/stockSchema";

// create a new stock
const createStock = async (req: Request, res: Response) => {
  try {
    const stock = await StockModel.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Stock created",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const stockRouter = {
  createStock,
};
