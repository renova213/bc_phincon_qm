import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
  fetchAppReviews,
  fetchCourseReviews,
  fetchTryoutReviews,
} from "../store/slices/reviewSlice";
import ReviewCard from "../components/ReviewCard";
import * as api from "../services/api";
import type { Review } from "../types/review.types";

const ReviewListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { appReviews, courseReviews, tryoutReviews, loading } = useSelector(
    (state: RootState) => state.reviews
  );
  const [activeTab, setActiveTab] = useState<"app" | "course" | "tryout">(
    "app"
  );

  useEffect(() => {
    dispatch(fetchAppReviews());
    dispatch(fetchCourseReviews());
    dispatch(fetchTryoutReviews());
  }, [dispatch]);

  const handleVoteReview = async (
    reviewId: string,
    type: "UPVOTE" | "DOWNVOTE"
  ) => {
    try {
      await api.voteReview(reviewId, type);
      // Refresh all reviews after voting
      dispatch(fetchAppReviews());
      dispatch(fetchCourseReviews());
      dispatch(fetchTryoutReviews());
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const getActiveReviews = (): Review[] => {
    switch (activeTab) {
      case "app":
        return appReviews;
      case "course":
        return courseReviews;
      case "tryout":
        return tryoutReviews;
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Reviews</h1>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("app")}
              className={`${
                activeTab === "app"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              App Reviews
            </button>
            <button
              onClick={() => setActiveTab("course")}
              className={`${
                activeTab === "course"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Course Reviews
            </button>
            <button
              onClick={() => setActiveTab("tryout")}
              className={`${
                activeTab === "tryout"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Tryout Reviews
            </button>
          </nav>
        </div>

        <div className="mt-6 space-y-6">
          {getActiveReviews().map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onVote={handleVoteReview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewListPage;
