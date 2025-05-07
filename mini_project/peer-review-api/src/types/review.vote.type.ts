enum VoteTypeReview {
  UP_VOTE = "upvote",
  DOWN_VOTE = "downvote",
}

export interface ReviewVoteType {
  id: string;
  userId: string;
  reviewId: string;
  type: VoteTypeReview;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ReviewVoteAttributeType = Omit<
  ReviewVoteType,
  "id" | "createdAt" | "updatedAt" | "active"
>;
