import { Op } from "sequelize";
import Category from "../models/category.model.js";

export class CategoryService {
  static async createCategory(categoryData: any) {
    return await Category.create(categoryData);
  }

  static async getCategoryById(id: string) {
    return await Category.findByPk(id, {
      include: [
        { association: "products", attributes: ["id", "name", "price"] },
      ],
    });
  }

  static async getAllCategories(
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

    const { count, rows } = await Category.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      categories: rows,
    };
  }

  static async updateCategory(id: string, updateData: any) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }

    return await category.update(updateData);
  }

  static async deleteCategory(id: string) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }

    await category.destroy();
    return { message: "Category deleted successfully" };
  }
}
