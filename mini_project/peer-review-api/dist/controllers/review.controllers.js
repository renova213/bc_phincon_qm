import ReviewServices from "../services/review.services.js";
import UploadImageServices from "../services/upload.image.services.js";
import { CourseType } from "../types/review.type.js";
class CourseController {
    static async gettAppReviews(req, res) {
        try {
            const reviews = await ReviewServices.findReviewByType(CourseType.APP);
            res.status(200).json({
                success: true,
                data: reviews,
            });
            return;
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
            return;
        }
    }
    static async getCourseReviews(req, res) {
        try {
            const reviews = await ReviewServices.findReviewByType(CourseType.COURSE);
            res.status(200).json({
                success: true,
                data: reviews,
            });
            return;
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
            return;
        }
    }
    static async getTryoutReviews(req, res) {
        const { limit } = req.params;
        try {
            const reviews = await ReviewServices.findReviewByType(CourseType.TRYOUT, Number(limit ?? 10));
            res.status(200).json({
                success: true,
                data: reviews,
            });
            return;
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
            return;
        }
    }
    static async createReview(req, res) {
        try {
            let reviewData = req.body;
            reviewData.userId = req.params.userId;
            const image = req.file;
            if (image) {
                reviewData.image = await UploadImageServices.processImage(image);
            }
            const newReview = await ReviewServices.createReview(reviewData);
            res.status(201).json({
                success: true,
                message: "Review created successfully",
                data: newReview,
            });
            return;
        }
        catch (error) {
            console.error("Error creating review:", error);
            res.status(500).json({
                success: false,
                message: "Failed to create review",
            });
            return;
        }
    }
    static async updateReview(req, res) {
        try {
            const { reviewId } = req.params;
            const image = req.file;
            let updatedReviewData = req.body;
            if (image) {
                const existingReview = await ReviewServices.findById(reviewId);
                const imageFileId = existingReview?.dataValues?.data?.imageFileId;
                let uploadNewImage = true;
                if (imageFileId) {
                    uploadNewImage = await UploadImageServices.deleteImage(imageFileId);
                }
                if (uploadNewImage) {
                    const uploadedImage = await UploadImageServices.processImage(image);
                    updatedReviewData.image = uploadedImage.url;
                    updatedReviewData.data = { imageFileId: uploadedImage.fileId };
                }
            }
            const updatedReview = await ReviewServices.updateReview(reviewId, updatedReviewData);
            res.status(200).json({
                success: true,
                message: "Review updated successfully",
                data: updatedReview,
            });
        }
        catch (error) {
            console.error("Error updating review:", error);
            res.status(500).json({
                success: false,
                message: "Failed to update review",
                error: error.message,
            });
        }
    }
}
export default CourseController;
