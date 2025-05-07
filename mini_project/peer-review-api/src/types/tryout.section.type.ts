export interface TryoutSectionType {
  id: string;
  code: string;
  description: string;
  title: string;
  order: number;
  data: Object;
  tag: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TryoutSectionttributeType = Omit<
  TryoutSectionType,
  "id" | "createdAt" | "updatedAt"
>;
