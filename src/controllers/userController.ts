import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/userModel";

// create an user
const createUser = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      ...req.body,
      password: hashedPassword,
    };
    const user = await User.create(userData);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
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
