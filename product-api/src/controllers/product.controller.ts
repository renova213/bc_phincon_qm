import { Request, Response } from "express";
import Category from "../models/category";
import Product from "../models/product";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "Category" }],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch products",
        error: (error as Error).message,
      });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [{ model: Category, as: "Category" }],
    });

    if (!product) {
      res.status(404).json({ message: `Product with id ${id} not found` });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch product",
        error: (error as Error).message,
      });
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId } = req.params;

    // Check if category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      res
        .status(404)
        .json({ message: `Category with id ${categoryId} not found` });
      return;
    }

    const products = await Product.findAll({
      where: { categoryId },
      include: [{ model: Category, as: "Category" }],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      message: "Failed to fetch products by category",
      error: (error as Error).message,
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    if (!name || !price || !categoryId) {
      res
        .status(400)
        .json({ message: "Name, price, and categoryId are required fields" });
      return;
    }

    // Check if category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      res
        .status(404)
        .json({ message: `Category with id ${categoryId} not found` });
      return;
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock: stock || 0,
      categoryId,
    });

    const productWithCategory = await Product.findByPk(newProduct.id, {
      include: [{ model: Category, as: "Category" }],
    });

    res.status(201).json(productWithCategory);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({
        message: "Failed to create product",
        error: (error as Error).message,
      });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: `Product with id ${id} not found` });
      return;
    }

    // If categoryId is being updated, check if the new category exists
    if (categoryId && categoryId !== product.categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        res
          .status(404)
          .json({ message: `Category with id ${categoryId} not found` });
        return;
      }
    }

    await product.update({
      name,
      description,
      price,
      stock,
      categoryId,
    });

    const updatedProduct = await Product.findByPk(id, {
      include: [{ model: Category, as: "Category" }],
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({
        message: "Failed to update product",
        error: (error as Error).message,
      });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: `Product with id ${id} not found` });
      return;
    }

    await product.destroy();
    res
      .status(200)
      .json({ message: `Product with id ${id} successfully deleted` });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({
        message: "Failed to delete product",
        error: (error as Error).message,
      });
  }
};
