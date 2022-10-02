import { Request, Response } from "express";
import { CatagoryModel } from "../models/catagoryModel";

// create
const createCatagory = async (req: Request, res: Response) => {
  try {
    const catagory = await CatagoryModel.create(req.body);
    res.status(201).send({
      message: "Catagory created",
      status: 201,
      data: catagory,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// get all
const getAllCatagory = async (req: Request, res: Response) => {
  try {
    const catagories = await CatagoryModel.find().select("-__v");
    res.status(200).send({
      message: "All catagories",
      status: 200,
      data: catagories,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// get single
const getSingleCatagory = async (req: Request, res: Response) => {
  try {
    const filter = { _id: req.params.id };
    const catagory = await CatagoryModel.findOne(filter);
    if (!catagory) {
      res.status(404).send({
        message: "Catagory not found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "Catagory",
        status: 200,
        data: catagory,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

export const catagoryRouter = {
  getAllCatagory,
  getSingleCatagory,
  createCatagory,
};
