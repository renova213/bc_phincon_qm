import type Review from "../entities/review.interface";

export interface AddReviewProps {
  type: string;
  referenceId: string;
  courseId?: string | null;
  tryoutId?: string | null;
  appId?: string | null;
  content: string;
  rating?: number | null;
  image?: File | null;
}

export interface UpdateReviewProps {
  content: string;
  rating?: number | null;
  image?: File | null;
}

export interface VoteReviewProps {
  userId: string;
  reviewId: string;
  type: "upvote" | "downvote";
}

export default interface ReviewStore {
  reviews: Review[];
  reviewLoading: boolean;
  reviewError: string | null;
  fetchReviews: (id: string, endpoint: string) => Promise<void>;
  fetchReview: (id: string) => Promise<Review>;
  addReview: (userId: string, addReview: AddReviewProps) => Promise<void>;
  updateReview: (
    reviewId: string,
    addReview: UpdateReviewProps
  ) => Promise<void>;
  addVoteReview: (voteReview: VoteReviewProps) => Promise<void>;
}
