import { DataTypes } from "sequelize";
import { ProductInstance } from "../types";
import Category from "./category";
import { sequelize } from "./index";

const Product = sequelize.define<ProductInstance>(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

Product.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });
Category.hasMany(Product, { foreignKey: "categoryId", as: "Products" });

export default Product;
