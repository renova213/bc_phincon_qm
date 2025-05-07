import { Request, Response } from "express";
import { CategoryService } from "../services/category.service.js";

export class CategoryController {
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      if (!category) {
        res.status(404).json({ error: "Category not found" });
        return;
      }
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string | undefined;

      const result = await CategoryService.getAllCategories(
        page,
        limit,
        search
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryService.updateCategory(
        req.params.id,
        req.body
      );
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const result = await CategoryService.deleteCategory(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
