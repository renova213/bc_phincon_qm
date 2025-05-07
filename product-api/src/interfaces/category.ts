export interface Category {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryInput
  extends Omit<Category, "id" | "createdAt" | "updatedAt"> {}
