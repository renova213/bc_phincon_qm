import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchCourseById } from "../store/slices/courseSlice";
import { createReview, updateReview } from "../store/slices/reviewSlice";
import NestedReview from "../components/NestedReview";
import ReviewForm from "../components/ReviewForm";
import { ReviewType } from "../types/review.types";
import * as api from "../services/api";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentCourse, loading } = useSelector(
    (state: RootState) => state.courses
  );
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [courseId, dispatch]);

  const handleSubmitReview = async (formData: FormData) => {
    try {
      await dispatch(createReview(formData)).unwrap();
      setShowReviewForm(false);
      if (courseId) {
        dispatch(fetchCourseById(courseId));
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleVoteReview = async (
    reviewId: string,
    type: "UPVOTE" | "DOWNVOTE"
  ) => {
    try {
      await api.voteReview(reviewId, type);
      if (courseId) {
        dispatch(fetchCourseById(courseId));
      }
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  if (loading || !currentCourse) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {currentCourse.title}
        </h1>
        <p className="text-gray-600 mb-4">{currentCourse.description}</p>
        {currentCourse.tag && (
          <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full">
            {currentCourse.tag}
          </span>
        )}
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Write a Review
          </button>
        </div>

        {showReviewForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <ReviewForm
              type={ReviewType.COURSE}
              courseId={courseId}
              onSubmit={handleSubmitReview}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        )}

        <div className="space-y-6">
          {currentCourse.reviews?.map((review) => (
            <NestedReview
              key={review.id}
              review={review}
              onVote={handleVoteReview}
              onSubmitReply={handleSubmitReview}
              type={ReviewType.COURSE}
              courseId={courseId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
