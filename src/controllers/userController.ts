import { Request, Response } from "express";
import { User } from "../models/userModel";

// create an user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({
      message: "User created",
      status: 201,
      data: user,
    });
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
