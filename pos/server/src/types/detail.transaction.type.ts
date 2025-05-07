export interface DetailTransactionModel {
  id: string;
  transactionId: string;
  productIds: string[];
  quantity: number;
  subTotal: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DetailTransactionModelPublicAttributeModel = Omit<
  DetailTransactionModel,
  "id" | "createdAt" | "updatedAt"
>;
