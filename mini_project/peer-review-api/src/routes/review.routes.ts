import Express from "express";
import ReviewController from "../controllers/review.controllers.js";
import {
  ReviewBadwordsValidator,
  ReviewValidator,
  UploadImage,
} from "../middlewares/index.js";

const router = Express.Router();

router.get("/review/nested/app", ReviewController.gettAppReviews);
router.get("/review/nested/courses", ReviewController.getCourseReviews);
router.get("/review/nested/tryout-sections", ReviewController.getTryoutReviews);
router.get("/review/nested/app/:appId", ReviewController.gettAppReviewsById);
router.get(
  "/review/nested/courses/:courseId",
  ReviewController.getCourseReviewsById
);
router.get(
  "/review/nested/tryout-sections/:tryoutId",
  ReviewController.getTryoutReviewsById
);
router.get("/review/:reviewId", ReviewController.getReviewById);

router.post(
  "/review/:userId",
  UploadImage.uploadSingle,
  ReviewValidator.createReviewValidator,
  ReviewBadwordsValidator,
  ReviewValidator.alreadyExistParentReviewValidator,
  ReviewController.createReview
);
router.put(
  "/review/:reviewId",
  UploadImage.uploadSingle,
  ReviewValidator.updateReviewValidator,
  ReviewController.updateReview
);

export default router;
