export enum ReviewType {
  APP = "APP",
  COURSE = "COURSE",
  TRYOUT = "TRYOUT",
}

export interface Review {
  id: string;
  title?: string;
  content: string;
  rating: number;
  type: ReviewType;
  courseId?: string;
  tryoutId?: string;
  userId: string;
  image?: string;
  data?: {
    imageFileId?: string;
    completedIn?: string;
    platform?: string;
  };
  createdAt: string;
  updatedAt: string;
  user?: User;
  course?: Course;
  tryoutSection?: TryoutSection;
  reviewVotes?: ReviewVote[];
  referenceId?: string;
  replies?: Review[];
  active?: boolean;
}

export interface ReviewVote {
  id: string;
  reviewId: string;
  userId: string;
  type: "upvote" | "downvote";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description?: string;
  order?: number;
  data?: any;
  tag?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
}

export interface TryoutSection {
  id: string;
  code: string;
  title: string;
  description?: string;
  order?: number;
  data?: any;
  tag?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
}
