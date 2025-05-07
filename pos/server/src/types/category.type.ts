export interface CategoryModel {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryModelPublicAttributeModel = Omit<
  CategoryModel,
  "id" | "createdAt" | "updatedAt"
>;
