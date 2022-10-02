import { Request, Response } from "express";

import { SupplierModel } from "../models/supplierModel";

/* for get all the users */
const getAllSupplier = async (req: Request, res: Response) => {
  try {
    const suppliers = await SupplierModel.find().select(
      "-products -brands -__v"
    );
    // const brands = await BrandModel.find();
    res.status(200).send({
      message: "All suppliers",
      status: 200,
      data: suppliers,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

const getSingleSupplier = async (req: Request, res: Response) => {
  try {
    // const brand = await BrandModel.findById(req.params.id);
    const filter = { _id: req.params.id };
    const supplier = await SupplierModel.findOne(filter);
    if (!supplier) {
      res.status(404).send({
        message: "Supplier not found",
        status: 404,
      });
    } else {
      res.status(200).send({
        message: "Supplier",
        status: 200,
        data: supplier,
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
const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await SupplierModel.create(req.body);
    res.status(201).send({
      message: "Supplier created",
      status: 201,
      data: supplier,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

export const supplierRouter = {
  getAllSupplier,
  getSingleSupplier,
  createSupplier,
};
