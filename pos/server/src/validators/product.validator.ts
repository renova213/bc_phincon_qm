import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required().min(3).max(100).messages({
    "string.base": "Product name should be a type of text",
    "string.empty": "Product name cannot be empty",
    "string.min":
      "Product name should have a minimum length of {#limit} characters",
    "string.max":
      "Product name should have a maximum length of {#limit} characters",
    "any.required": "Product name is a required field",
  }),
  price: Joi.number().required().min(0).messages({
    "number.base": "Price should be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is a required field",
  }),
  description: Joi.string().required().min(10).max(500).messages({
    "string.base": "Description should be a type of text",
    "string.empty": "Description cannot be empty",
    "string.min":
      "Description should have a minimum length of {#limit} characters",
    "string.max":
      "Description should have a maximum length of {#limit} characters",
    "any.required": "Description is a required field",
  }),
  stock: Joi.number().required().min(0).messages({
    "number.base": "Stock should be a number",
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is a required field",
  }),
  categoryId: Joi.string().uuid().required().messages({
    "string.base": "Category ID should be a string",
    "string.guid": "Category ID should be a valid UUID",
    "any.required": "Category ID is a required field",
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).messages({
    "string.base": "Product name should be a type of text",
    "string.empty": "Product name cannot be empty",
    "string.min":
      "Product name should have a minimum length of {#limit} characters",
    "string.max":
      "Product name should have a maximum length of {#limit} characters",
  }),
  price: Joi.number().min(0).messages({
    "number.base": "Price should be a number",
    "number.min": "Price cannot be negative",
  }),
  description: Joi.string().min(10).max(500).messages({
    "string.base": "Description should be a type of text",
    "string.empty": "Description cannot be empty",
    "string.min":
      "Description should have a minimum length of {#limit} characters",
    "string.max":
      "Description should have a maximum length of {#limit} characters",
  }),
  stock: Joi.number().min(0).messages({
    "number.base": "Stock should be a number",
    "number.min": "Stock cannot be negative",
  }),
  categoryId: Joi.string().uuid().messages({
    "string.base": "Category ID should be a string",
    "string.guid": "Category ID should be a valid UUID",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

export const validateCreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createProductSchema.validate(req.body, {
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

export const validateUpdateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateProductSchema.validate(req.body, {
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
