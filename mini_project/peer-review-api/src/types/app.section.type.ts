export interface AppSectionType {
  id: string;
  code: string;
  title: string;
  description: string;
  order: number;
  data: Object;
  tag: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AppSectionAttributeType = Omit<
  AppSectionType,
  "id" | "createdAt" | "updatedAt"
>;
