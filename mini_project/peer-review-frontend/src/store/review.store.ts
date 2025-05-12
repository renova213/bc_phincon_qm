import { create } from "zustand";
import axios from "axios";
import type ReviewStore from "../interfaces/stores/review.store.interface";
import type {
  AddReviewProps,
  UpdateReviewProps,
  VoteReviewProps,
} from "../interfaces/stores/review.store.interface";
import type Review from "../interfaces/entities/review.interface";

const BASE_URL = "http://localhost:3000/api";

export const useReviewStore = create<ReviewStore>((set) => ({
  reviews: [],
  review: null,
  reviewLoading: false,
  reviewError: null,

  fetchReviews: async (id, endpoint) => {
    set({ reviewLoading: true, reviewError: null });
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const reviewsData = response.data.data ?? [];
      set({ reviews: reviewsData, reviewLoading: false });
    } catch {
      set({
        reviewError: "Failed to fetch reviews",
        reviewLoading: false,
        reviews: [],
      });
    }
  },

  addReview: async (userId: string, addReview: AddReviewProps) => {
    const formData = new FormData();

    Object.entries(addReview).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    try {
      await axios.post(`${BASE_URL}/review/${userId}`, formData);
    } catch (error) {
      throw console.error("Failed to add review:", error);
    }
  },

  addVoteReview: async (voteReview: VoteReviewProps) => {
    try {
      await axios.post(`${BASE_URL}/vote/review`, JSON.stringify(voteReview), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to vote:", error);
      throw error;
    }
  },
  updateReview: async (reviewId: string, updateReview: UpdateReviewProps) => {
    const formData = new FormData();

    Object.entries(updateReview).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    try {
      await axios.put(`${BASE_URL}/review/${reviewId}`, formData);
    } catch (error) {
      throw console.error("Failed to add review:", error);
    }
  },

  fetchReview: async (id: string): Promise<Review> => {
    try {
      const response = await axios.get(`${BASE_URL}/review/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const reviewData = response.data.data ?? null;
      return reviewData;
    } catch (error) {
      console.error("Failed to fetch review::", error);
      return Promise.reject(new Error(`${error}`));
    }
  },
}));
