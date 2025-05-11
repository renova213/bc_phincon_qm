import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../services/api";
import type { Review } from "../../types/review.types";
import { ReviewType } from "../../types/review.types";

interface ReviewState {
  appReviews: Review[];
  courseReviews: Review[];
  tryoutReviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  appReviews: [],
  courseReviews: [],
  tryoutReviews: [],
  loading: false,
  error: null,
};

export const fetchAppReviews = createAsyncThunk(
  "reviews/fetchAppReviews",
  async () => {
    const response = await api.getReviews(ReviewType.APP);
    return response;
  }
);

export const fetchCourseReviews = createAsyncThunk(
  "reviews/fetchCourseReviews",
  async (courseId: string) => {
    const response = await api.getReviews(ReviewType.COURSE, courseId);
    return response;
  }
);

export const fetchTryoutReviews = createAsyncThunk(
  "reviews/fetchTryoutReviews",
  async (tryoutId: string) => {
    const response = await api.getReviews(
      ReviewType.TRYOUT,
      undefined,
      tryoutId
    );
    return response;
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({
    type,
    formData,
    courseId,
    tryoutId,
  }: {
    type: ReviewType;
    formData: FormData;
    courseId?: string;
    tryoutId?: string;
  }) => {
    const response = await api.createReview(type, formData, courseId, tryoutId);
    return response;
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, formData }: { reviewId: string; formData: FormData }) => {
    const response = await api.updateReview(reviewId, formData);
    return response;
  }
);

export const voteReview = createAsyncThunk(
  "reviews/voteReview",
  async ({
    reviewId,
    type,
  }: {
    reviewId: string;
    type: "upvote" | "downvote";
  }) => {
    const response = await api.voteReview(reviewId, type);
    return response;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch App Reviews
      .addCase(fetchAppReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.appReviews = action.payload;
      })
      .addCase(fetchAppReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch app reviews";
      })
      // Fetch Course Reviews
      .addCase(fetchCourseReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.courseReviews = action.payload;
      })
      .addCase(fetchCourseReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch course reviews";
      })
      // Fetch Tryout Reviews
      .addCase(fetchTryoutReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTryoutReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.tryoutReviews = action.payload;
      })
      .addCase(fetchTryoutReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tryout reviews";
      })
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        const review = action.payload;
        if (review.type === ReviewType.APP) {
          state.appReviews = [review, ...state.appReviews];
        } else if (review.type === ReviewType.COURSE) {
          state.courseReviews = [review, ...state.courseReviews];
        } else if (review.type === ReviewType.TRYOUT) {
          state.tryoutReviews = [review, ...state.tryoutReviews];
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create review";
      })
      // Update Review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        const updatedReview = action.payload;
        const updateReviewInList = (reviews: Review[]) =>
          reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          );

        state.appReviews = updateReviewInList(state.appReviews);
        state.courseReviews = updateReviewInList(state.courseReviews);
        state.tryoutReviews = updateReviewInList(state.tryoutReviews);
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update review";
      })
      // Vote Review
      .addCase(voteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(voteReview.fulfilled, (state, action) => {
        state.loading = false;
        const updatedReview = action.payload;
        const updateReviewInList = (reviews: Review[]) =>
          reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          );

        state.appReviews = updateReviewInList(state.appReviews);
        state.courseReviews = updateReviewInList(state.courseReviews);
        state.tryoutReviews = updateReviewInList(state.tryoutReviews);
      })
      .addCase(voteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to vote on review";
      });
  },
});

export default reviewSlice.reducer;
