import type ReviewVote from "./review.vote";

export default interface Review {
  id: string;
  content: string | null;
  rating: number;
  userId: string;
  image: string | null;
  createdAt: string;
  type: string;
  referenceId: string;
  replies: Review[];
  reviewVotes: ReviewVote[];
  user: {
    fullname: string;
  };
}
