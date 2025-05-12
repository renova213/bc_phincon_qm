import type Review from "../interfaces/entities/review.interface";
import ReviewComponent from "./review";

export default function ReviewsList({
  reviews,
  loading,
  error,
  type,
  pageId,
}: Readonly<{
  reviews: Review[];
  loading: boolean;
  error: string | null;
  type: "COURSE" | "TRYOUT_SECTION" | "APP";
  pageId: string;
}>) {
  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (reviews.length === 0)
    return <div className="text-gray-400">No reviews yet</div>;

  return (
    <div className="bg-gray-800 rounded-lg p-8">
      {reviews.map((review) => {
        const myUserId = "e5f6a7b8-c9d0-1234-5678-90abcdef4321";

        const userVote = review.reviewVotes?.find((v) => v.userId === myUserId);
        const upvote =
          review.reviewVotes?.filter(
            (v) => v.type === "upvote" && v.reviewId === review.id
          )?.length ?? 0;

        const downvote =
          review.reviewVotes?.filter(
            (v) => v.type === "downvote" && v.reviewId === review.id
          )?.length ?? 0;
        return (
          <div key={review.id + review.createdAt} className="pb-4">
            <ReviewComponent
              pageId={pageId}
              review={review}
              type={type}
              referenceId={""}
              depth={0}
              upVote={upvote}
              downVote={downvote}
              userVoteType={userVote?.type ?? ""}
            />
          </div>
        );
      })}
    </div>
  );
}
