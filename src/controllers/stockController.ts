import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { StockModel } from "../models/stockSchema";
interface queries {
  sortBy?: string;
  limit?: number;
  page?: number;
  fields?: string;
  skip?: number;
  id?: ObjectId;
}
type ids = ObjectId | string;

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

// get all stock
const getAllStock = async (req: Request, res: Response) => {
  let filters = { ...req.query };
  // operators
  let queryStr = JSON.stringify(filters);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  // console.log(JSON.parse(queryStr));
  filters = JSON.parse(queryStr);
  // exclude the page and limit from the query
  const excludedFields = ["page", "limit", "sort"];
  excludedFields.forEach((field) => delete filters[field]);
  // build the query
  let queries: queries = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.toString().split(",").join(" ");
    queries.sortBy = sortBy;
  }
  // console.log(queries.sortBy);
  if (req.query.fields) {
    const fields = req.query.fields.toString().split(",").join(" ");
    queries.fields = fields;
  }
  // pagination logic
  const { page, limit } = req.query;
  const pageNumber = parseInt(page as string, 10) || 1;
  const limitNumber = parseInt(limit as string, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  queries.skip = skip;
  queries.limit = limitNumber;
  // console.log(queries);
  try {
    const stock = await StockModel.find({ ...filters });
    res.status(200).json({
      status: "success",
      message: "All Stock",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// get a single stock
const getSingleStock = async (req: Request, res: Response) => {
  try {
    const stock = await StockModel.findById(req.params.id)
      .populate("brand.id")
      .populate("suppiliedBy.id")
      .populate("store.id");

    // const id: ids = req.params.id;
    //  pipeline => aggregation framework
    // const stock = await StockModel.aggregate([
    //   { $match: { _id: id } },
    //   {
    //     $lookup: {
    //       from: "brands",
    //       localField: "brand.id",
    //       foreignField: "_id",
    //       as: "brand",
    //     },  
    //   },
    // ]);
    console.log(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Single Stock",
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
  getAllStock,
  getSingleStock,
};
