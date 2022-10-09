import { NextFunction, Request, Response } from "express";
const verifyManager = (req: Request, res: Response, next: NextFunction) => {
  const role = req.body?.user?.role;
  if (role !== "store-manager") {
    return res.status(401).send({
      message: "Unauthorized",
      status: 401,
    });
  }
  next();
};

export { verifyManager };
