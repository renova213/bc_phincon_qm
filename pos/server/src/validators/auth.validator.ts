import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const registerValidation = Joi.object({
  username: Joi.string().alphanum().min(8).max(16).required().messages({
    "string.min": "Username must be at least 8 characters long",
    "string.max": "Username can't be longer than 16 characters",
    "any.required": "Username is required",
    "string.alphanum": "Username must contain only letters and numbers",
  }),

  role: Joi.string().valid("cashier", "admin").required().messages({
    "any.required": "Role is required",
    "any.only": 'Role must be either "cashier" or "admin"',
  }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, and one number, and be at least 8 characters long",
      "any.required": "Password is required",
    }),
});

export const loginValidation = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

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
