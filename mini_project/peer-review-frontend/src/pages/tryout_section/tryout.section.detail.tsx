import { useEffect, useState } from "react";

import { useReviewStore } from "../../store/review.store";
import WriteReview from "../../components/write.review";
import { useParams } from "react-router-dom";
import TryoutSectionDetailContent from "./components/tryout.section.detail.content";
import ReviewsList from "../../components/review.list";
import { toast } from "react-toastify";

export default function TryoutSectionDetail() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reviews, reviewLoading, reviewError, fetchReviews, addReview } =
    useReviewStore();
  const { tryoutId } = useParams<{ tryoutId: string }>();
  const myUserId = "e5f6a7b8-c9d0-1234-5678-90abcdef4321";

  if (!tryoutId) {
    window.location.href = "/";
  }
  useEffect(() => {
    fetchReviews(tryoutId ?? "", `review/nested/tryout-sections`);
  }, [fetchReviews, tryoutId]);

  const handleSubmitReview = async (
    content: string,
    rating: number,
    image?: File | null
  ) => {
    if (!tryoutId) return;
    setIsSubmitting(true);
    try {
      await addReview(myUserId, {
        type: "TRYOUT_SECTION",
        referenceId: "",
        tryoutId: tryoutId,
        content,
        rating,
        image,
      });
      await fetchReviews(tryoutId ?? "", `review/nested/tryout-sections`);
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="mt-12">
        <TryoutSectionDetailContent />
        <h2 className="text-2xl font-bold mb-6 pt-6">Reviews</h2>
        <div className="mb-8">
          <WriteReview
            onSubmit={handleSubmitReview}
            isSubmitting={isSubmitting}
            placeholder="Share your thoughts about this tryout section..."
          />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">All Reviews</h3>
          <ReviewsList
            pageId={tryoutId ?? ""}
            reviews={reviews}
            loading={reviewLoading}
            error={reviewError}
            type="TRYOUT_SECTION"
          />
        </div>
      </section>
    </div>
  );
}
