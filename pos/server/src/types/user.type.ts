import { UserRoleEnum } from "./user.role.type";

export interface UserModel {
  id: string;
  username: string;
  password: string;
  role: UserRoleEnum;
  createdAt: Date;
  updatedAt: Date;
}

export type UserPublicAttributeModel = Omit<
  UserModel,
  "id" | "createdAt" | "updatedAt"
>;
