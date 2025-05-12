import React, { useState } from "react";
import type Review from "../interfaces/entities/review.interface";

interface WriteReviewProps {
  onSubmit: (
    content: string,
    rating: number,
    image?: File | null
  ) => Promise<void>;
  isSubmitting: boolean;
  placeholder?: string;
  isReply?: boolean;
  review?: Review | null;
}

export default function WriteReview({
  onSubmit,
  isSubmitting,
  placeholder = "Share your thoughts...",
  isReply = false,
  review,
}: Readonly<WriteReviewProps>) {
  const [reviewContent, setReviewContent] = useState(review?.content ?? "");
  const [reviewRating, setReviewRating] = useState(review?.rating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = React.createRef<HTMLInputElement>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReviewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewRating === 0 && isReply === false) return;

    await onSubmit(reviewContent, reviewRating, reviewImage);

    resetForm();
  };

  const resetForm = () => {
    setReviewContent("");
    setHoverRating(0);
    setReviewRating(0);
    setReviewImage(null);
    setImagePreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const renderStars = (rating: number, isInteractive = false) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={`star-${star}`}
          type={isInteractive ? "button" : undefined}
          onClick={isInteractive ? () => setReviewRating(star) : undefined}
          onMouseEnter={isInteractive ? () => setHoverRating(star) : undefined}
          onMouseLeave={isInteractive ? () => setHoverRating(0) : undefined}
          className={`p-1 ${isInteractive ? "cursor-pointer" : ""}`}
        >
          <svg
            className={`w-8 h-8 ${
              star <= (hoverRating || rating)
                ? "text-yellow-400"
                : "text-gray-600"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
      {isInteractive && reviewRating > 0 && (
        <span className="ml-2 text-gray-400 text-sm">
          {reviewRating} {reviewRating === 1 ? "star" : "stars"}
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        {!isReply && (
          <div className="mb-4">
            <p className="block text-gray-300 mb-2">Rating :</p>
            {renderStars(reviewRating, true)}
          </div>
        )}
        <div className="mb-4">
          <p className="block text-gray-300 mb-2">Your Review :</p>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-md p-3"
            rows={4}
            placeholder={placeholder}
            required
          />
        </div>
        <div className="mb-4">
          <p className="block text-gray-300 mb-2">Add Image (Optional):</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
            className="w-full bg-gray-700 text-white rounded-md p-2"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs h-auto rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setReviewImage(null);
                  setImagePreview(null);
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
                className="mt-2 text-red-400 hover:text-red-300 text-sm"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting || (!isReply && reviewRating === 0)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
        >
          {isSubmitting
            ? "Submitting..."
            : isReply
            ? "Submit Reply"
            : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
