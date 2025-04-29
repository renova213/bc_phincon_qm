import { Document } from "mongoose";

export interface ITodo {
  title: string;
  description: string;
  status: "to do" | "in-progress" | "done" | "archived";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: Date;
  tags: string[];
  completed?: boolean;
}

export interface ITodoDocument extends ITodo, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
