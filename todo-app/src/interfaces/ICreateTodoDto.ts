import { TodoPriority, TodoStatus } from "../types/todo.types";

export default interface ICreateTodoDto {
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  tags?: string[];
}
