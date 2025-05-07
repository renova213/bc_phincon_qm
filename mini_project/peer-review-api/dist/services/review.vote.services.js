import ReviewVoteModel from "../models/review.vote.model.js";
class ReviewVoteService {
    async findById(id) {
        const reviewVote = await ReviewVoteModel.findByPk(id);
        return reviewVote;
    }
    async findByReview(reviewId) {
        const reviewVotes = await ReviewVoteModel.findAll({
            where: { reviewId: reviewId },
        });
        return reviewVotes;
    }
    async findByUserAndReview(userId, reviewId) {
        const reviewVote = await ReviewVoteModel.findOne({
            where: { userId: userId, reviewId: reviewId },
        });
        return reviewVote;
    }
    async create(data) {
        const reviewVote = await ReviewVoteModel.create(data);
        return reviewVote;
    }
    async update(id, data) {
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
