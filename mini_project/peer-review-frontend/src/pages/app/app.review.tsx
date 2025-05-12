import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useReviewStore } from "../../store/review.store";
import WriteReview from "../../components/write.review";
import ReviewsList from "../../components/review.list";

export default function AppReview() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reviews, reviewLoading, reviewError, fetchReviews, addReview } =
    useReviewStore();
  const myUserId = "e5f6a7b8-c9d0-1234-5678-90abcdef4321";

  useEffect(() => {
    fetchReviews("", `review/nested/app`);
  }, [fetchReviews]);

  const handleSubmitReview = async (
    content: string,
    rating: number,
    image?: File | null
  ) => {
    setIsSubmitting(true);
    try {
      await addReview(myUserId, {
        type: "APP",
        referenceId: "",
        content,
        rating,
        image,
      });
      await fetchReviews("", `review/nested/app`);
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6 pt-6">App Reviews</h2>
        <div className="mb-8">
          <WriteReview
            onSubmit={handleSubmitReview}
            isSubmitting={isSubmitting}
            placeholder="Share your thoughts about this app..."
          />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">All Reviews</h3>
          <ReviewsList
            pageId={""}
            reviews={reviews}
            loading={reviewLoading}
            error={reviewError}
            type={"APP"}
          />
        </div>
      </section>
    </div>
  );
}
