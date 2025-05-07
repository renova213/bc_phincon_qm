import ReviewVoteServices from "../services/review.vote.services.js";
class ReviewVoteController {
    async createOrUpdateReviewVote(req, res) {
        try {
            const reviewVoteData = req.body;
            const { userId, reviewId, type } = reviewVoteData;
            let existingVote = await ReviewVoteServices.findByUserAndReview(userId, reviewId);
            if (!existingVote) {
                const newVote = await ReviewVoteServices.create(reviewVoteData);
                res.status(201).json({
                    success: true,
                    message: "Review vote created successfully",
                    data: newVote,
                });
                return;
            }
            if (existingVote) {
                const updatedVote = await ReviewVoteServices.update(existingVote.dataValues.id, {
                    type,
                });
                res.status(200).json({
                    success: true,
                    message: "Review vote updated successfully",
                    data: updatedVote,
                });
                return;
            }
            return;
        }
        catch {
            res.status(500).json({
                success: false,
                message: "Failed to create or update review vote",
            });
            return;
        }
    }
}
export default new ReviewVoteController();
