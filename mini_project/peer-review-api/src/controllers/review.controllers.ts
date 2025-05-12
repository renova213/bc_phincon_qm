import { Request, Response } from "express";
import ReviewServices from "../services/review.services.js";
import UploadImageServices from "../services/upload.image.services.js";
import { CourseType } from "../types/review.type.js";

class CourseController {
  static async getReviewById(req: Request, res: Response): Promise<void> {
    try {
      const { reviewId } = req.params;
      const review = await ReviewServices.findById(reviewId);
      res.status(200).json({
        success: true,
        data: review,
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
  static async gettAppReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await ReviewServices.findReviews({
        referenceId: "",
        type: CourseType.APP,
      });
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

  static async gettAppReviewsById(req: Request, res: Response): Promise<void> {
    try {
      const { appId } = req.params;

      if (!appId) {
        res.status(404).json({
          success: false,
          message: `appId is required`,
        });
        return;
      }

      const review = await ReviewServices.findReviews({
        referenceId: "",
        type: CourseType.APP,
        appSectionId: appId,
      });
      res.status(200).json({
        success: true,
        data: review,
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
      const reviews = await ReviewServices.findReviews({
        referenceId: "",
        type: CourseType.COURSE,
      });

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

  static async getCourseReviewsById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { courseId } = req.params;

      if (!courseId) {
        res.status(404).json({
          success: false,
          message: `courseId is required`,
        });
        return;
      }

      const review = await ReviewServices.findReviews({
        referenceId: "",
        type: CourseType.COURSE,
        courseId: courseId,
      });

      if (!review) {
        res.status(404).json({
          success: false,
          message: `Course with given id not found`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: review,
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
    try {
      const reviews = await ReviewServices.findReviews({
        referenceId: "",
        type: CourseType.TRYOUT,
      });

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

  static async getTryoutReviewsById(
    req: Request,
    res: Response
  ): Promise<void> {
    const { tryoutId } = req.params;

    try {
      if (!tryoutId) {
        res.status(404).json({
          success: false,
          message: `tryoutId is required`,
        });
        return;
      }
      const review = await ReviewServices.findReviews({
        referenceId: "",
        type: CourseType.TRYOUT,
        tryoutId: tryoutId,
      });

      res.status(200).json({
        success: true,
        data: review,
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
      console.log(image?.buffer);
      console.log(image?.originalname);
      if (image) {
        const uploadedImage = await UploadImageServices.processImage(image);
        reviewData.image = uploadedImage.url;
        reviewData.data = { imageFileId: uploadedImage.fileId };
      }

      await ReviewServices.createReview(reviewData);

      res.status(201).json({
        success: true,
        message: "Review created successfully",
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

      await ReviewServices.updateReview(reviewId, updatedReviewData);

      res.status(200).json({
        success: true,
        message: "Review updated successfully",
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
