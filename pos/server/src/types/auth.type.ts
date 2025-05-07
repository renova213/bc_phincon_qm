export interface AuthModel {
  id: string;
  userName: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AuthModelPublicAttributeModel = Omit<
  AuthModel,
  "id" | "createdAt" | "updatedAt"
>;
