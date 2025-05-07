import { DataTypes, Model, Sequelize } from "sequelize";
import sequelizeConfig from "../configs/database.js";
import {
  CategoryModel,
  CategoryModelPublicAttributeModel,
} from "../types/category.type.js";

class Category extends Model<CategoryModel, CategoryModelPublicAttributeModel> {
  static associate(models: any) {
    Category.hasMany(models, {
      foreignKey: "categoryId",
      as: "products",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: sequelizeConfig,
    tableName: "categories",
    timestamps: true,
    modelName: "Category",
  }
);

export default Category;
