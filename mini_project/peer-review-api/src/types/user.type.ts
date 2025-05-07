export interface UserType {
  id: string;
  fullname: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  active: boolean;
  data: Object;
  createdAt: Date;
  updatedAt: Date;
}

export type UserAttributeType = Omit<
  UserType,
  "id" | "createdAt" | "updatedAt"
>;
