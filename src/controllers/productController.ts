import { Request, Response } from "express";

// for get all the products
export const getAllProducts = async (req: Request, res: Response) => {
  res.status(200).send({
    message: "All Products",
    status: 200,
  });
};

export const productsRouter = {
  getAllProducts,
};
