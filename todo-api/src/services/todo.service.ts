import { FilterQuery } from "mongoose";

import { ITodo, ITodoDocument } from "../interfaces/todo.interface";
import Todo from "../models/todo.model";

interface TodoFilter {
  status?: string;
  priority?: string;
  tags?: { $in: string[] };
  $or?: Array<{ [key: string]: any }>;
}

interface PaginationOptions {
  page: number;
  limit: number;
}

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class TodoService {
  async getAllTodos(
    paginationOptions?: PaginationOptions
  ): Promise<PaginatedResult<ITodoDocument>> {
    const filter: TodoFilter = {};

    const page = paginationOptions?.page || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Todo.find(filter as FilterQuery<ITodoDocument>)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Todo.countDocuments(filter as FilterQuery<ITodoDocument>),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async getTodoById(id: string): Promise<ITodoDocument | null> {
    return Todo.findById(id);
  }

  async createTodo(todoData: ITodo): Promise<ITodoDocument> {
    return Todo.create(todoData);
  }

  async updateTodo(
    id: string,
    todoData: Partial<ITodo>
  ): Promise<ITodoDocument | null> {
    return Todo.findByIdAndUpdate(id, todoData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTodo(id: string): Promise<boolean> {
    const result = await Todo.findByIdAndDelete(id);
    return !!result;
  }

  async updateTodoStatus(
    id: string,
    status: string
  ): Promise<ITodoDocument | null> {
    const todo = await Todo.findById(id);

    if (!todo) {
      return null;
    }
    todo.status = status.toLowerCase() as
      | "to do"
      | "in-progress"
      | "done"
      | "archived";
    await todo.save();

    return todo;
  }

  async todoExists(id: string): Promise<boolean> {
    const todo = await Todo.findById(id);
    return !!todo;
  }
}

export default new TodoService();
