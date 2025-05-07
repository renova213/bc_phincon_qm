import { Category } from "./category";

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  category?: Category;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductInput
  extends Omit<Product, "id" | "createdAt" | "updatedAt" | "category"> {}
