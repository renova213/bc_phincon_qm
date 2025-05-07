import { Model, Optional } from "sequelize";

// Category Types
export interface CategoryAttributes {
  id: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

export interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes {
  Products?: ProductInstance[];
}

// Product Types
export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id"> {}

export interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {
  Category?: CategoryInstance;
}
