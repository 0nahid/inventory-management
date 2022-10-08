import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import { generateToken } from "./../utils/tokenGenerate";

// create an user
const signUp = async (req: Request, res: Response) => {
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

// login an user
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password required",
        status: 400,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found with this email, please signup first",
        status: 404,
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({
        message: "Invalid Password",
        status: 401,
      });
    }
    if (user.status === "inactive") {
      return res.status(401).send({
        message: "Your account is inactive",
        status: 401,
      });
    }

    // generate token
    const token = generateToken(user);
    const { password: pass, ...data } = user._doc;
    res.status(200).json({
      status: "success",
      data: {
        data,
        token,
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

// get me
const getMe = async (req: Request, res: Response) => {
  const email = req.body?.user?.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found with this email, please signup first",
        status: 404,
      });
    }
    const { password, ...data } = user._doc;
    res.status(200).json({
      status: "success",
      data: {
        data,
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
  signUp,
  login,
  getMe,
};
