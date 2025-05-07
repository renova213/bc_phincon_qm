import { Request, Response } from "express";
import ReviewServices from "../services/review.services.js";
import UploadImageServices from "../services/upload.image.services.js";
import { CourseType } from "../types/review.type.js";

class CourseController {
  static async gettAppReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await ReviewServices.findReviewByType(CourseType.APP);
      res.status(200).json({
        success: true,
        data: reviews,
      });
      return;
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }
  }
  static async getCourseReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await ReviewServices.findReviewByType(CourseType.COURSE);
      res.status(200).json({
        success: true,
        data: reviews,
      });
      return;
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }
  }

  static async getTryoutReviews(req: Request, res: Response): Promise<void> {
    const { limit } = req.params;

    try {
      const reviews = await ReviewServices.findReviewByType(
        CourseType.TRYOUT,
        Number(limit ?? 10)
      );
      res.status(200).json({
        success: true,
        data: reviews,
      });
      return;
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }
  }

  static async createReview(req: Request, res: Response): Promise<void> {
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
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create review",
      });
      return;
    }
  }

  static async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const { reviewId } = req.params;
      const image = req.file;
      let updatedReviewData = req.body;

      if (image) {
        const existingReview = await ReviewServices.findById(reviewId);
        const imageFileId: string | undefined = (
          existingReview?.dataValues?.data as { imageFileId?: string }
        )?.imageFileId;

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

      const updatedReview = await ReviewServices.updateReview(
        reviewId,
        updatedReviewData
      );

      res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: updatedReview,
      });
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update review",
        error: (error as Error).message,
      });
    }
  }
}

export default CourseController;
