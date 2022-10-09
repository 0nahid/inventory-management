import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import sendMailWIthGmail from "../utils/email";
import { generateToken } from "./../utils/tokenGenerate";

// create an user
const signUp = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  generate a random confirmationToken
    const confirmationToken = crypto.randomBytes(20).toString("hex");
    const date = new Date();
    const confirmationTokenExpires = date.setDate(date.getDate() + 1);

    const userData = {
      ...req.body,
      password: hashedPassword,
      confirmationToken,
      confirmationTokenExpires,
    };
    const user = await User.create(userData);

    // send email
    const mailData = {
      to: user.email,
      subject: "Welcome to the Inventory Management",
      text: `
        Hi ${user.firstName},
        Welcome to the Inventory Management.
        Your account has been created successfully.
        Your token is ${confirmationToken} and it will expire after 24 hours .
        To confirm your account, please click on the following link:
        ${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/confirm/${confirmationToken}
        If you did not request this, please ignore this email.
        
        Thanks
      `,
    };
    sendMailWIthGmail(mailData);

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

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: "success",
      data: {
        users,
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
  getAllUsers,
};
