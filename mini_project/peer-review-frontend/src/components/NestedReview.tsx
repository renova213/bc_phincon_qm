import React, { useState } from "react";
import type { Review } from "../types/review.types";
import { formatDistanceToNow } from "date-fns";
import ReviewForm from "./ReviewForm";
import { ReviewType } from "../types/review.types";

interface NestedReviewProps {
  review: Review;
  depth?: number;
  onVote?: (reviewId: string, type: "upvote" | "downvote") => void;
  onSubmitReply?: (formData: FormData) => void;
  type: ReviewType;
  courseId?: string;
  tryoutId?: string;
}

const NestedReview: React.FC<NestedReviewProps> = ({
  review,
  depth = 0,
  onVote,
  onSubmitReply,
  type,
  courseId,
  tryoutId,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const maxDepth = 5;

  const upvotes =
    review.reviewVotes?.filter((vote) => vote.type === "upvote").length || 0;
  const downvotes =
    review.reviewVotes?.filter((vote) => vote.type === "downvote").length || 0;

  const handleSubmitReply = (formData: FormData) => {
    if (onSubmitReply) {
      formData.append("referenceId", review.id);
      onSubmitReply(formData);
      setShowReplyForm(false);
    }
  };

  if (!review.active) {
    return null;
  }

  return (
    <div className="relative">
      {/* Vertical line for nesting */}
      {depth > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200" />
      )}

      <div className={`${depth > 0 ? "ml-8" : ""} space-y-4`}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              {review.user?.avatar && (
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
              )}
              <div>
                <p className="text-gray-600 text-sm">
                  By {review.user?.name} •{" "}
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <button
                  onClick={() => onVote?.(review.id, "upvote")}
                  className="text-gray-500 hover:text-green-500 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="mx-1 text-sm font-medium">{upvotes}</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => onVote?.(review.id, "downvote")}
                  className="text-gray-500 hover:text-red-500 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="mx-1 text-sm font-medium">{downvotes}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    star <= review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 whitespace-pre-line">
              {review.content}
            </p>
            {review.image && (
              <img
                src={review.image}
                alt="Review"
                className="mt-4 rounded-lg max-h-96 object-cover"
              />
            )}
            {review.data?.completedIn && (
              <p className="text-sm text-gray-500 mt-2">
                Completed in: {review.data.completedIn}
              </p>
            )}
            {review.data?.platform && (
              <p className="text-sm text-gray-500 mt-2">
                Platform: {review.data.platform}
              </p>
            )}
          </div>
          {depth < maxDepth && (
            <div className="mt-4">
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Reply
              </button>
              {showReplyForm && (
                <div className="mt-4">
                  <ReviewForm
                    type={type}
                    courseId={courseId}
                    tryoutId={tryoutId}
                    onSubmit={handleSubmitReply}
                    onCancel={() => setShowReplyForm(false)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {review.replies && review.replies.length > 0 && depth < maxDepth && (
          <div className="space-y-4">
            {review.replies.map((reply) => (
              <NestedReview
                key={reply.id}
                review={reply}
                depth={depth + 1}
                onVote={onVote}
                onSubmitReply={onSubmitReply}
                type={type}
                courseId={courseId}
                tryoutId={tryoutId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NestedReview;
