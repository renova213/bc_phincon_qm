// src/controllers/categoryController.ts
import { Request, Response } from "express";
import Category from "../models/category";
import Product from "../models/product";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch categories",
        error: (error as Error).message,
      });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [{ model: Product, as: "Products" }],
    });

    if (!category) {
      res.status(404).json({ message: `Category with id ${id} not found` });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch category",
        error: (error as Error).message,
      });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ message: "Category name is required" });
      return;
    }

    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      res
        .status(409)
        .json({ message: `Category with name '${name}' already exists` });
      return;
    }

    const newCategory = await Category.create({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({
        message: "Failed to create category",
        error: (error as Error).message,
      });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({ message: `Category with id ${id} not found` });
      return;
    }

    // Check if name is being updated and if it already exists
    if (name && name !== category.get("name")) {
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        res
          .status(409)
          .json({ message: `Category with name '${name}' already exists` });
        return;
      }
    }

    await category.update({ name, description });
    res.status(200).json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({
        message: "Failed to update category",
        error: (error as Error).message,
      });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({ message: `Category with id ${id} not found` });
      return;
    }

    // Check if there are products in this category
    const productCount = await Product.count({ where: { categoryId: id } });
    if (productCount > 0) {
      res.status(400).json({
        message: `Cannot delete category with id ${id} as it contains ${productCount} products`,
      });
      return;
    }

    await category.destroy();
    res
      .status(200)
      .json({ message: `Category with id ${id} successfully deleted` });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({
        message: "Failed to delete category",
        error: (error as Error).message,
      });
  }
};
