import { TodoPriority, TodoStatus } from "../types/todo.types";

export default interface IUpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  tags?: string[];
}
