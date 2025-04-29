import { TodoPriority, TodoStatus } from "../types/todo.types";

export default interface ITodo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  status: TodoStatus;
  priority: TodoPriority;
  dueDate?: string; // ISO string format
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
