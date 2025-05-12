import { NextFunction, Request, Response } from "express";
import db from "../models/index.js";
import { ReviewValidator } from "../validators/index.js";

const updateReviewValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reviewId } = req.params;

  if (!reviewId) {
    res.status(400).json({
      success: false,
      message: "reviewId is required",
    });
    return;
  }

  const existingReview = await db.Review.findByPk(reviewId, {
    attributes: ["referenceId"],
  });
  if (!existingReview) {
    res.status(404).json({
      success: false,
      message: "Review with the given ID was not found",
    });
    return;
  }

  const existingReviewObject = existingReview.toJSON();

  if (existingReviewObject.referenceId.trim() !== "") {
    const error = ReviewValidator.updateReplyReviewValidator.validate(
      req.body
    ).error;
    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }
  } else {
    const error = ReviewValidator.updateParentReviewValidator.validate(
      req.body
    ).error;

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }
  }

  next();
};

const createReviewValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { referenceId, courseId, tryoutId, type } = req.body;
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({
      success: false,
      message: "userId is required",
    });
    return;
  }

  if (!courseId && !tryoutId && type.toLowerCase() !== "app") {
    res.status(400).json({
      success: false,
      message: "courseId or tryoutId is required",
    });
    return;
  }

  if (referenceId.trim() !== "") {
    const error = ReviewValidator.replyReviewValidator.validate(req.body).error;

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }
  } else {
    const error = ReviewValidator.parentReviewValidator.validate(
      req.body
    ).error;

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }
  }

  next();
};

const alreadyExistParentReviewValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { referenceId, courseId, tryoutId, type } = req.body;
  const { userId } = req.params;

  if (referenceId.trim() === "") {
    if (courseId) {
      const existingCourse = await db.Course.findOne({
        where: { id: courseId },
      });

      if (!existingCourse) {
        res.status(404).json({
          success: false,
          message: "course not found",
        });
        return;
      }

      const existingUser = await db.User.findByPk(userId);

      if (!existingUser) {
        res.status(404).json({
          success: false,
          message: "user not found",
        });
        return;
      }

      const existingUserReview = await db.Review.findOne({
        where: { referenceId: "", userId: userId, courseId: courseId },
      });

      if (existingUserReview) {
        res.status(400).json({
          success: false,
          message: "you already reviewed this course",
        });

        return;
      }
    }

    if (tryoutId) {
      const existingTryoutSection = await db.TryoutSection.findOne({
        where: { id: tryoutId },
      });

      if (!existingTryoutSection) {
        res.status(404).json({
          success: false,
          message: "tryout section not found",
        });
        return;
      }

      const existingUser = await db.Review.findOne({
        where: { referenceId: "", userId: userId, tryoutId: tryoutId },
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "you already reviewed this course",
        });

        return;
      }
    }

    if (type.toLowerCase() === "app") {
      const existingUser = await db.Review.findOne({
        where: { referenceId: "", userId: userId, type: "APP" },
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "you already reviewed this course",
        });

        return;
      }
    }
  }

  next();
};

export default {
  createReviewValidator,
  alreadyExistParentReviewValidator,
  updateReviewValidator,
};
