import { NextFunction, Request, Response } from "express";
import ReviewServices from "../services/review.services.js";
import { ReviewVoteValidator } from "../validators/index.js";

const ReviewValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = ReviewVoteValidator.createOrUpdateVoteReviewValidator.validate(
    req.body
  ).error;
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};

const notFoundVoteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reviewId } = req.body;
    const review = await ReviewServices.findById(reviewId);
    if (!review) {
      res.status(404).json({
        success: false,
        message: `Review with given id not found`,
      });
      return;
    }
    next();
  } catch {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export default { ReviewValidator, notFoundVoteReview };
