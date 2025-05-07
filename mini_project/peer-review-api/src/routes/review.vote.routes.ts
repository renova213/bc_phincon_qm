import Express from "express";
import ReviewVoteController from "../controllers/review.vote.controllers.js";
import { ReviewVoteValidator, UserValidator } from "../middlewares/index.js";

const router = Express.Router();

router.post(
  "/vote/reviews",
  ReviewVoteValidator.ReviewValidator,
  ReviewVoteValidator.notFoundVoteReview,
  UserValidator.userExistValidator,
  ReviewVoteController.createOrUpdateReviewVote
);

export default router;
