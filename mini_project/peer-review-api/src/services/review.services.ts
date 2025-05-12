import { WhereOptions } from "sequelize";
import db from "../models/index.js";
import ReviewModel from "../models/review.model.js";
import {
  ReviewAttributeType,
  ReviewType,
  ReviewUpdateAttribute,
} from "../types/review.type.js";

class ReviewServices {
  static async findReviews(
    option: WhereOptions<ReviewType> = { referenceId: "" }
  ) {
    let reviews = await db.Review.findAll({
      include: [
        {
          model: db.ReviewVote,
          as: "reviewVotes",
          attributes: { exclude: ["createdAt", "updatedAt", "active"] },
        },
        {
          model: db.User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "active", "password"],
          },
        },
      ],
      where: option,
    });

    for (const review of reviews) {
      review.dataValues.replies = await this.findRepliesRecursively(
        review.dataValues.id
      );
    }

    reviews.sort((a, b) => {
      const voteDifference =
        (b.dataValues.reviewVotes ?? []).reduce((sum, type) => {
          return sum + (type.type === "upvote" ? 1 : -1);
        }, 0) -
        (a.dataValues.reviewVotes ?? []).reduce((sum, type) => {
          return sum + (type.type === "upvote" ? 1 : -1);
        }, 0);

      if (voteDifference !== 0) {
        return voteDifference;
      }

      return (
        new Date(a.dataValues.createdAt).getTime() -
        new Date(b.dataValues.createdAt).getTime()
      );
    });

    return reviews;
  }

  static async findRepliesRecursively(
    parentId: string,
    currentDepth: number = 1,
    maxDepth: number = 4
  ): Promise<ReviewType[]> {
    const replies = await db.Review.findAll({
      include: [
        {
          model: db.ReviewVote,
          as: "reviewVotes",
          attributes: { exclude: ["createdAt", "updatedAt", "active"] },
        },
        {
          model: db.User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "active", "password"],
          },
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
        replyData.replies = await this.findRepliesRecursively(
          replyData.id,
          currentDepth + 1,
          maxDepth
        );
      } else {
        replyData.replies = await this.collectAllDeeperReplies(replyData.id);
      }
    }

    replies.sort(
      (a, b) =>
        new Date(a.dataValues.createdAt).getTime() -
        new Date(b.dataValues.createdAt).getTime()
    );

    return replies.map((reply) => reply.dataValues);
  }

  static async collectAllDeeperReplies(
    parentId: string
  ): Promise<ReviewType[]> {
    const stack: ReviewType[] = [];
    const queue: string[] = [parentId];

    while (queue.length > 0) {
      const currentId = queue.shift();
      const replies = await db.Review.findAll({
        include: [
          {
            model: db.ReviewVote,
            as: "reviewVotes",
            attributes: { exclude: ["createdAt", "updatedAt", "active"] },
          },
          {
            model: db.User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "active", "password"],
            },
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

    stack.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return stack;
  }

  static async findById(id: string) {
    let review = await db.Review.findByPk(id, {
      include: [
        {
          model: db.ReviewVote,
          as: "reviewVotes",
          attributes: { exclude: ["createdAt", "updatedAt", "active"] },
        },
        {
          model: db.User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "active", "password"],
          },
        },
      ],
    });

    if (review?.dataValues.id !== "" && review) {
      review.dataValues.replies = await this.findRepliesRecursively(
        review.dataValues.id
      );
    }
    return review;
  }

  static async createReview(data: ReviewAttributeType) {
    const review = await db.Review.create(data);
    return review;
  }

  static async updateReview(
    id: string,
    data: Partial<ReviewUpdateAttribute>
  ): Promise<ReviewModel | null> {
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
