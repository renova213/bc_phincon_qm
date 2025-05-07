import db from "../models/index.js";
class ReviewServices {
    static async findReviews(limit = 10) {
        let reviews = await db.Review.findAll({
            include: [
                {
                    model: db.ReviewVote,
                    as: "reviewVotes",
                    attributes: { exclude: ["createdAt", "updatedAt", "active"] },
                },
            ],
            where: {
                referenceId: "",
            },
            limit: limit,
        });
        for (const review of reviews) {
            review.dataValues.replies = await this.findRepliesRecursively(review.dataValues.id);
        }
        reviews.sort((a, b) => (b.dataValues.reviewVotes ?? []).reduce((sum, type) => {
            return sum + (type.type === "upvote" ? 1 : -1);
        }, 0) -
            (a.dataValues.reviewVotes ?? []).reduce((sum, type) => {
                return sum + (type.type === "upvote" ? 1 : -1);
            }, 0));
        return reviews;
    }
    static async findReviewByType(type, limit = 10) {
        let reviews = await db.Review.findAll({
            include: [
                {
                    model: db.ReviewVote,
                    as: "reviewVotes",
                    attributes: { exclude: ["createdAt", "updatedAt", "active"] },
                },
            ],
            where: {
                referenceId: "",
                type: type.toUpperCase(),
            },
            limit: limit,
        });
        for (const review of reviews) {
            review.dataValues.replies = await this.findRepliesRecursively(review.dataValues.id);
        }
        reviews.sort((a, b) => (b.dataValues.reviewVotes ?? []).reduce((sum, type) => {
            return sum + (type.type === "upvote" ? 1 : -1);
        }, 0) -
            (a.dataValues.reviewVotes ?? []).reduce((sum, type) => {
                return sum + (type.type === "upvote" ? 1 : -1);
            }, 0));
        return reviews;
    }
    static async findRepliesRecursively(parentId, currentDepth = 1, maxDepth = 4) {
        const replies = await db.Review.findAll({
            include: [
                {
                    model: db.ReviewVote,
                    as: "reviewVotes",
                    attributes: { exclude: ["createdAt", "updatedAt", "active"] },
                },
            ],
            where: {
                referenceId: parentId,
            },
        });
        if (replies.length === 0) {
            return [];
        }
        for (const reply of replies) {
            const replyData = reply.dataValues;
            if (currentDepth < maxDepth) {
                replyData.replies = await this.findRepliesRecursively(replyData.id, currentDepth + 1, maxDepth);
            }
            else {
                replyData.replies = await this.collectAllDeeperReplies(replyData.id);
            }
        }
        replies.sort((a, b) => (b.dataValues.reviewVotes ?? []).reduce((sum, type) => {
            return sum + (type.type === "upvote" ? 1 : -1);
        }, 0) -
            (a.dataValues.reviewVotes ?? []).reduce((sum, type) => {
                return sum + (type.type === "upvote" ? 1 : -1);
            }, 0));
        return replies.map((reply) => reply.dataValues);
    }
    static async collectAllDeeperReplies(parentId) {
        const stack = [];
        const queue = [parentId];
        while (queue.length > 0) {
            const currentId = queue.shift();
            const replies = await db.Review.findAll({
                include: [
                    {
                        model: db.ReviewVote,
                        as: "reviewVotes",
                        attributes: { exclude: ["createdAt", "updatedAt", "active"] },
                    },
                ],
                where: {
                    referenceId: currentId,
                },
            });
            for (const reply of replies) {
                stack.push(reply.dataValues);
                queue.push(reply.dataValues.id);
            }
        }
        stack.sort((a, b) => (b.reviewVotes ?? []).reduce((sum, type) => {
            return sum + (type.type === "upvote" ? 1 : -1);
        }, 0) -
            (a.reviewVotes ?? []).reduce((sum, type) => {
                return sum + (type.type === "upvote" ? 1 : -1);
            }, 0));
        return stack;
    }
    static async findById(id) {
        const review = await db.Review.findByPk(id);
        return review;
    }
    static async createReview(data) {
        const review = await db.Review.create(data);
        return review;
    }
    static async updateReview(id, data) {
        const updatedReview = await db.Review.update(data, {
            where: { id },
        });
        if (updatedReview) {
            const updatedReview = await db.Review.findByPk(id);
            return updatedReview;
        }
        throw Error("Failed update review");
    }
}
export default ReviewServices;
