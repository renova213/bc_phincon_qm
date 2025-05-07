import { Request, Response } from "express";
import TryoutSectionServices from "../services/tryout.section.services.js";

class TryoutSectionController {
  static async getAllTryoutSections(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const tryoutSections = await TryoutSectionServices.getAllTryoutSections();
      res.status(200).json({
        success: true,
        data: tryoutSections,
      });
      return;
    } catch {
      res.status(500).json({
        success: false,
        message: "Failed to fetch tryout sections",
      });
      return;
    }
  }

  static async getTryoutSectionById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { tryoutSectionId } = req.params;

      const tryoutSection = await TryoutSectionServices.getTryouSectiontById(
        tryoutSectionId
      );

      if (!tryoutSection) {
        res.status(404).json({
          success: false,
          message: `Tryout section with given id not found`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: tryoutSection,
      });
      return;
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch course",
      });
      return;
    }
  }
}

export default TryoutSectionController;
