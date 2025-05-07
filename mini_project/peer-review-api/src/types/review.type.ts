import { ReviewVoteType } from "./review.vote.type";

export enum CourseType {
  COURSE = "COURSE",
  TRYOUT = "TRYOUT_SECTION",
  APP = "APP",
}

export interface ReviewType {
  id: string;
  userId: string;
  referenceId: string;
  courseId?: string;
  tryoutId?: string;
  type: CourseType;
  rating: number;
  content: string;
  image: string;
  data: Object;
  replies?: ReviewType[];
  reviewVotes?: ReviewVoteType[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ReviewAttributeType = Omit<
  ReviewType,
  "id" | "createdAt" | "updatedAt | active | replies"
>;

export type ReviewUpdateAttribute = {
  id: string;
  rating: number;
  content: string;
  image: string;
} & Partial<
  Omit<
    ReviewType,
    | "id"
    | "rating"
    | "content"
    | "image"
    | "createdAt"
    | "updatedAt"
    | "replies"
  >
>;
