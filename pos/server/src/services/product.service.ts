import { Op } from "sequelize";
import Category from "../models/category.model.js";
import { Product } from "../models/index.js";

export class ProductService {
  static async createProduct(productData: any) {
    const category = await Category.findByPk(productData.categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    return await Product.create(productData);
  }

  static async getProductById(id: string) {
    return await Product.findByPk(id, {
      include: [{ association: "category", attributes: ["id", "name"] }],
    });
  }

  static async getAllProducts(
    page: number = 1,
    limit: number = 10,
    search?: string
  ) {
    const offset = (page - 1) * limit;
    const where = search
      ? {
          name: { [Op.iLike]: `%${search}%` },
        }
      : {};

    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products: rows,
    };
  }

  static async updateProduct(id: string, updateData: any) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }

    if (updateData.categoryId) {
      const category = await Category.findByPk(updateData.categoryId);
      if (!category) {
        throw new Error("Category not found");
      }
    }

    return await product.update(updateData);
  }

  static async deleteProduct(id: string) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }

    await product.destroy();
    return { message: "Product deleted successfully" };
  }

  static async getProductsByCategory(categoryId: string) {
    return await Product.findAll({
      where: { categoryId },
      include: [{ association: "category", attributes: ["id", "name"] }],
    });
  }
}
