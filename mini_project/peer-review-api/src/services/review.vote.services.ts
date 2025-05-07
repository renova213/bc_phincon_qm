import ReviewVoteModel from "../models/review.vote.model.js";
import { ReviewVoteAttributeType } from "../types/review.vote.type.js";

class ReviewVoteService {
  async findById(id: string) {
    const reviewVote = await ReviewVoteModel.findByPk(id);
    return reviewVote;
  }

  async findByReview(reviewId: string) {
    const reviewVotes = await ReviewVoteModel.findAll({
      where: { reviewId: reviewId },
    });
    return reviewVotes;
  }

  async findByUserAndReview(userId: string, reviewId: string) {
    const reviewVote = await ReviewVoteModel.findOne({
      where: { userId: userId, reviewId: reviewId },
    });
    return reviewVote;
  }

  async create(data: ReviewVoteAttributeType) {
    const reviewVote = await ReviewVoteModel.create(data);
    return reviewVote;
  }

  async update(id: string, data: Partial<ReviewVoteAttributeType>) {
    const updatedVoteReview = await ReviewVoteModel.update(data, {
      where: { id: id },
    });

    if (updatedVoteReview) {
      const updatedReviewVote = await ReviewVoteModel.findByPk(id);
      return updatedReviewVote;
    }

    throw Error("Failed to update review vote");
  }
}

export default new ReviewVoteService();
