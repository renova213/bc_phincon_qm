export interface ProductModel {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductModelPublicAttributeModel = Omit<
  ProductModel,
  "id" | "createdAt" | "updatedAt"
>;
