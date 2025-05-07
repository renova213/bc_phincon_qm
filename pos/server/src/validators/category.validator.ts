import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().required().min(3).max(50).messages({
    "string.base": "Category name should be a type of text",
    "string.empty": "Category name cannot be empty",
    "string.min":
      "Category name should have a minimum length of {#limit} characters",
    "string.max":
      "Category name should have a maximum length of {#limit} characters",
    "any.required": "Category name is a required field",
  }),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    "string.base": "Category name should be a type of text",
    "string.empty": "Category name cannot be empty",
    "string.min":
      "Category name should have a minimum length of {#limit} characters",
    "string.max":
      "Category name should have a maximum length of {#limit} characters",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

export const validateCreateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createCategorySchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));
    res.status(400).json({ errors });
    return;
  }
  next();
};

export const validateUpdateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateCategorySchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));
    res.status(400).json({ errors });
    return;
  }
  next();
};
