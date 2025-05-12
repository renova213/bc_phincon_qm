export default interface ReviewVote {
  id: string;
  reviewId: string;
  userId: string;
  type: "upvote" | "downvote";
}
