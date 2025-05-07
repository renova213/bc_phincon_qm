import { NextFunction, Request, Response } from "express";
import db from "../models/index.js";

const userExistValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;

  const existingUser = await db.User.findByPk(userId);

  if (!existingUser) {
    res.status(404).json({
      success: false,
      message: "user not found",
    });
    return;
  }

  next();
};

export default { userExistValidator };
