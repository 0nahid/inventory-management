import { NextFunction, Request, Response } from "express";
import jwt from "jwt-promisify";
const JWT_SECRET = process.env.JWT_SECRET || "";
const veryfyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Access Denied",
        status: 401,
      });
    }
    // verify token
    const decoded = await jwt.verify(token, JWT_SECRET);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
      status: 401,
    });
  }
};

export { veryfyToken };
