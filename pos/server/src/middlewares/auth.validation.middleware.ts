import { NextFunction, Request, Response } from "express";
import {
  loginValidation,
  registerValidation,
} from "../validators/auth.validator.js";

export const registerValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = registerValidation.validate(req.body);

    if (error) {
      const validateError = registerValidation.validate(req.body).error;

      res.status(400).json({
        status: "error",
        message: validateError?.message,
      });

      return;
    }
    next();
  } catch (error: any) {
    console.error(error);
  }
};

export const loginValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = loginValidation.validate(req.body);

    if (error) {
      const validateError = loginValidation.validate(req.body).error;
      res.status(400).json({
        status: "error",
        message: validateError?.message,
      });

      return;
    }
    next();
  } catch (error: any) {
    console.error(error);
  }
};
