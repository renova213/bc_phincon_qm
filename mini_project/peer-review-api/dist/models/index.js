import CourseModel from "./course.model.js";
import ReviewModel from "./review.model.js";
import ReviewVoteModel from "./review.vote.model.js";
import TryoutSectionModel from "./tryout.section.model.js";
import UserModel from "./user.model.js";
const db = {
    Course: CourseModel,
    Review: ReviewModel,
    ReviewVote: ReviewVoteModel,
    TryoutSection: TryoutSectionModel,
    User: UserModel,
};
CourseModel.associateToReview(db);
ReviewModel.associateToTryout(db);
ReviewModel.associateToCourse(db);
ReviewModel.associateToReviewVote(db);
ReviewModel.associateToUser(db);
ReviewVoteModel.associateToReviewVote(db);
TryoutSectionModel.associateToReview(db);
export default db;
