export interface TransactionModel {
  id: string;
  cashierId: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TransactionModelPublicAttributeModel = Omit<
  TransactionModel,
  "id" | "createdAt" | "updatedAt"
>;
