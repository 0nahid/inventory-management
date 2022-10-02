import { Request, Response } from "express";
import { BrandModel } from "../models/brandModel";
import { ProductModel } from "../models/productModel";

// create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.create(req.body);
    const { _id: productId, brand } = product;
    // update the brand with the product id
    await BrandModel.updateOne(
      { _id: brand?.id },
      { $push: { products: productId } }
    );

    res.status(201).json({
      status: "success",
      message: "Product created",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find();
  res.status(200).json({
    status: "success",
    message: "All products",
    data: products,
  });
};

export const productsRouter = {
  createProduct,
  getAllProducts,
};
