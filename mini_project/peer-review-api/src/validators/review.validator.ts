import Joi from "joi";

const replyReviewValidator = Joi.object({
  content: Joi.string().required().messages({
    "any.required": "content is required",
  }),
  referenceId: Joi.string().required().messages({
    "any.required": "referenceId is required",
  }),
  type: Joi.string().valid().required().messages({
    "any.required": "type is required",
  }),
  courseId: Joi.string(),
  tryoutId: Joi.string(),
});

const parentReviewValidator = Joi.object({
  content: Joi.string().required().messages({
    "any.required": "content is required",
  }),
  referenceId: Joi.string().allow(null).allow(""),
  type: Joi.string().valid().required().messages({
    "any.required": "type is required",
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "any.required": "rating is required",
    "number.base": "rating must be a number",
    "number.integer": "rating must be an integer",
    "number.min": "rating must be at least 1",
    "number.max": "rating must be at most 5",
  }),
  courseId: Joi.string(),
  tryoutId: Joi.string(),
});

const updateParentReviewValidator = Joi.object({
  content: Joi.string().allow(null).allow("").messages({
    "any.required": "content is required",
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "any.required": "rating is required",
    "number.base": "rating must be a number",
    "number.integer": "rating must be an integer",
    "number.min": "rating must be at least 1",
    "number.max": "rating must be at most 5",
  }),
});

const updateReplyReviewValidator = Joi.object({
  content: Joi.string().allow(null).allow("").messages({
    "any.required": "content is required",
  }),
});

export default {
  replyReviewValidator,
  parentReviewValidator,
  updateParentReviewValidator,
  updateReplyReviewValidator,
};
