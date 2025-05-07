export interface CourseType {
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

export type CourseAttributeType = Omit<
  CourseType,
  "id" | "createdAt" | "updatedAt"
>;
