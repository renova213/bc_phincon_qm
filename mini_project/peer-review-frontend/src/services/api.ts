import axios from "axios";
import type { Course, TryoutSection } from "../types/review.types";
import { ReviewType } from "../types/review.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Course APIs
export const getCourses = () =>
  api.get<{ success: boolean; data: Course[] }>("/course");

export const getCourseById = (courseId: string) =>
  api.get<{ success: boolean; data: Course }>(`/course/${courseId}`);

// TryoutSection APIs
export const getTryoutSections = () =>
  api.get<{ success: boolean; data: TryoutSection[] }>("/tryout-sections");

export const getTryoutSectionById = (tryoutSectionId: string) =>
  api.get<{ success: boolean; data: TryoutSection }>(
    `/tryout-sections/${tryoutSectionId}`
  );

// Review APIs
export const getReviews = async (
  type: ReviewType,
  courseId?: string,
  tryoutId?: string
) => {
  let endpoint = "/review/nested/";
  switch (type) {
    case ReviewType.APP:
      endpoint += "app";
      break;
    case ReviewType.COURSE:
      endpoint += "courses";
      break;
    case ReviewType.TRYOUT:
      endpoint += "tryout-sections";
      break;
  }
  const response = await api.get(endpoint);
  return response.data.data;
};

export const createReview = async (
  type: ReviewType,
  formData: FormData,
  courseId?: string,
  tryoutId?: string
) => {
  const response = await api.post("/review", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: { type, courseId, tryoutId },
  });
  return response.data.data;
};

export const updateReview = async (reviewId: string, formData: FormData) => {
  const response = await api.put(`/review/${reviewId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const voteReview = async (
  reviewId: string,
  type: "upvote" | "downvote"
) => {
  const response = await api.post(`/review-vote/${reviewId}`, { type });
  return response.data.data;
};

export default api;
