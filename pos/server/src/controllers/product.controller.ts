import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";

export class ProductController {
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string | undefined;

      const result = await ProductService.getAllProducts(page, limit, search);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const result = await ProductService.deleteProduct(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getProductsByCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const products = await ProductService.getProductsByCategory(
        req.params.categoryId
      );
      res.json(products);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
