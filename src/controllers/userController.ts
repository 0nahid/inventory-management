import { Request, Response } from "express";
import { User } from "../models/userModel";

// create an user
const createUser = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error: error,
    });
  }
};

export const userRouter = {
  createUser,
};
