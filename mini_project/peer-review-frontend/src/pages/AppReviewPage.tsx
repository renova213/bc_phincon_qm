import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchAppReviews,
  createReview,
  voteReview,
} from "../store/slices/reviewSlice";
import NestedReview from "../components/NestedReview";
import ReviewForm from "../components/ReviewForm";
import type { Review } from "../types/review.types";
import { ReviewType } from "../types/review.types";
import LoadingSpinner from "../components/LoadingSpinner";

const AppReviewPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { appReviews, loading, error } = useAppSelector((state) => ({
    appReviews: state.reviews.appReviews,
    loading: state.reviews.loading,
    error: state.reviews.error,
  }));
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        await dispatch(fetchAppReviews()).unwrap();
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    loadReviews();
  }, [dispatch]);

  const handleSubmitReview = async (formData: FormData) => {
    try {
      await dispatch(createReview({ type: ReviewType.APP, formData })).unwrap();
      setShowReviewForm(false);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  const handleVote = async (reviewId: string, type: "upvote" | "downvote") => {
    try {
      await dispatch(voteReview({ reviewId, type })).unwrap();
    } catch (err) {
      console.error("Failed to vote:", err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">App Reviews</h1>
        <button
          onClick={() => setShowReviewForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Write a Review
        </button>
      </div>

      {showReviewForm && (
        <div className="mb-8">
          <ReviewForm
            type={ReviewType.APP}
            onSubmit={handleSubmitReview}
            onCancel={() => setShowReviewForm(false)}
          />
        </div>
      )}

      <div className="space-y-6">
        {appReviews?.map((review: Review) => (
          <NestedReview
            key={review.id}
            review={review}
            onVote={handleVote}
            onSubmitReply={handleSubmitReview}
            type={ReviewType.APP}
          />
        ))}
      </div>
    </div>
  );
};

export default AppReviewPage;
