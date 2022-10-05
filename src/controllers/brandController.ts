import { Request, Response } from "express";
import { BrandModel } from "../models/brandModel";

/* for get all the users */
const getAllBrand = async (req: Request, res: Response) => {
  try {
    const brands = await BrandModel.find().select("-products -suppliers -__v");
    // const brands = await BrandModel.find();
    res.status(200).send({
      message: "All brands",
      status: 200,
      data: brands,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

const getSingleBrand = async (req: Request, res: Response) => {
  try {
    // const brand = await BrandModel.findById(req.params.id);
    const filter = { _id: req.params.id };
    const brand = await BrandModel.findOne(filter)
      .populate("products suppliers.id", "-brand -__v -createdAt -updatedAt")
      .select(" -__v");
    if (!brand) {
      res.status(404).send({
        message: "Brand not found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "Brand",
        status: 200,
        data: brand,
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

// create a new brand
const createBrand = async (req: Request, res: Response) => {
  try {
    const brand = await BrandModel.create(req.body);
    res.status(201).send({
      message: "Brand created",
      status: 201,
      data: brand,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

// update a brand
const updateBrand = async (req: Request, res: Response) => {
  try {
    const brand = await BrandModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!brand) {
      res.status(404).send({
        message: "Brand not found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "Brand updated",
        status: 200,
        data: brand,
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

export const brandRouter = {
  getAllBrand,
  createBrand,
  getSingleBrand,
  updateBrand,
};
