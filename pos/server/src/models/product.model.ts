import { DataTypes, Model, Sequelize } from "sequelize";
import sequelizeConfig from "../configs/database.js";
import {
  ProductModel,
  ProductModelPublicAttributeModel,
} from "../types/product.type.js";

class Product extends Model<ProductModel, ProductModelPublicAttributeModel> {
  static associate(models: any) {
    Product.belongsTo(models, {
      foreignKey: "categoryId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "category",
    });
  }
}

Product.init(
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
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
    modelName: "Product",
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
