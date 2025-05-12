import { useState } from "react";
import { useReviewStore } from "../store/review.store";
import WriteReview from "./write.review";
import clsx from "clsx";
import type ReviewInterface from "../interfaces/entities/review.interface";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "react-toastify";

interface ReviewProps {
  pageId: string;
  review: ReviewInterface;
  type: string;
  referenceId: string;
  depth: number;
  upVote: number;
  downVote: number;
  userVoteType: string;
}

export default function Review(props: Readonly<ReviewProps>) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<ReviewInterface>(props.review);
  const [totalUpVote, setTotalUpVote] = useState<number>(props.upVote);
  const [totalDownVote, setTotalDownVote] = useState<number>(props.downVote);
  const [userVoteType, setUserVoteType] = useState<string>(props.userVoteType);

  const { addVoteReview, fetchReview, addReview, updateReview } =
    useReviewStore();

  const myUserId = "e5f6a7b8-c9d0-1234-5678-90abcdef4321";

  const handleSubmitReply = async (
    content: string,
    _: number,
    image?: File | null
  ) => {
    setIsSubmitting(true);
    try {
      await addReview(myUserId, {
        type: props.type,
        referenceId: reviewData.id,
        [props.type === "COURSE"
          ? "courseId"
          : props.type === "TRYOUT_SECTION"
          ? "tryoutId"
          : "appId"]: props.pageId,
        content,
        image,
      });

      const updatedReview = await fetchReview(props.review.id);
      setReviewData(updatedReview);
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
      setIsReplying(false);
    }
  };

  const handleEdit = async (
    content: string,
    rating: number,
    image?: File | null
  ) => {
    setIsSubmitting(true);
    try {
      await updateReview(reviewData.id, {
        content,
        ...(props.depth === 0 ? { rating } : {}),
        ...(image ? { image } : {}),
      });

      const updatedReview = await fetchReview(props.review.id);
      setReviewData(updatedReview);
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      await addVoteReview({
        userId: myUserId,
        reviewId: reviewData?.id ?? "",
        type: voteType,
      });

      const updated = await fetchReview(reviewData?.id ?? "");

      if (
        updated.reviewVotes !== null &&
        updated.reviewVotes !== undefined &&
        updated.reviewVotes.length > 0
      ) {
        const userVote = updated.reviewVotes?.find(
          (v) => v.userId === myUserId
        );
        const upvote =
          updated.reviewVotes?.filter(
            (v) => v.type === "upvote" && v.reviewId === updated.id
          )?.length ?? 0;

        const downvote =
          updated.reviewVotes?.filter(
            (v) => v.type === "downvote" && v.reviewId === updated.id
          )?.length ?? 0;

        setTotalDownVote(downvote);
        setTotalUpVote(upvote);
        setUserVoteType(userVote?.type ?? "");
      } else {
        setTotalDownVote(0);
        setTotalUpVote(0);
        setUserVoteType("");
      }
    } catch {
      toast.error("Failed to vote:");
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={`star-${star}`}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className={clsx("pb-1", props.depth === 0 ? "pr-4" : "pr-0 pl-8")}>
      <div className="flex">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                {reviewData?.user?.fullname}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(reviewData?.createdAt).toLocaleDateString()}
              </span>
            </div>
            {props.depth === 0 && renderStars(reviewData?.rating)}
          </div>

          {reviewData?.image && (
            <div className="mb-4">
              <img
                src={reviewData?.image ?? ""}
                alt="Review attachment"
                className="rounded-lg max-h-[300px] max-w-[300px]"
              />
            </div>
          )}

          <p className="text-gray-300 mb-4">{reviewData?.content}</p>

          <div className="flex items-center space-x-4 mb-2">
            <button
              onClick={() => handleVote("upvote")}
              className={clsx(
                "flex items-center space-x-1 hover:text-blue-300",
                userVoteType === "upvote" ? "text-blue-400" : "text-gray-400"
              )}
            >
              <ThumbsUp
                size={20}
                className={userVoteType === "upvote" ? "fill-blue-400" : ""}
              />
              <span className="text-sm font-medium">{totalUpVote}</span>
            </button>

            <button
              onClick={() => handleVote("downvote")}
              className={clsx(
                "flex items-center space-x-1 hover:text-red-300",
                userVoteType === "downvote" ? "text-red-400" : "text-gray-400"
              )}
            >
              <ThumbsDown
                size={20}
                className={userVoteType === "downvote" ? "fill-red-400" : ""}
              />
              <span className="text-sm font-medium">{totalDownVote}</span>
            </button>

            <button
              onClick={() => {
                if (isEditing) {
                  setIsEditing(false);
                  setIsReplying(false);
                  setTimeout(() => setIsReplying(!isReplying), 200);
                } else {
                  setIsReplying(!isReplying);
                }
              }}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              {isReplying ? "Cancel Reply" : "Reply"}
            </button>

            {reviewData.userId === myUserId && (
              <button
                onClick={() => {
                  if (isReplying) {
                    setIsEditing(false);
                    setIsReplying(false);
                    setTimeout(() => setIsEditing(!isEditing), 200);
                  } else {
                    setIsEditing(!isEditing);
                  }
                }}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {isEditing ? "Cancel Edit" : "Edit"}
              </button>
            )}
          </div>

          {(isReplying || isEditing) && (
            <div className="mt-4">
              <WriteReview
                review={isReplying === true ? null : reviewData}
                onSubmit={isReplying ? handleSubmitReply : handleEdit}
                isSubmitting={isSubmitting}
                isReply={props.depth !== 0 || (props.depth === 0 && !isEditing)}
              />
            </div>
          )}

          {reviewData?.replies?.length > 0 && (
            <div className="ml-4 mt-4">
              {reviewData.replies.map((reply: ReviewInterface) => {
                const userVote = reply.reviewVotes?.find(
                  (v) => v.userId === myUserId
                );
                const upvote =
                  reply.reviewVotes?.filter(
                    (v) => v.type === "upvote" && v.reviewId === reply.id
                  )?.length ?? 0;

                const downvote =
                  reply.reviewVotes?.filter(
                    (v) => v.type === "downvote" && v.reviewId === reply.id
                  )?.length ?? 0;

                return (
                  <Review
                    pageId={props.pageId}
                    key={reply.id + reply.createdAt}
                    review={reply}
                    type={reply.type}
                    referenceId={reply.referenceId}
                    depth={props.depth + 1}
                    upVote={upvote}
                    downVote={downvote}
                    userVoteType={userVote?.type ?? ""}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
