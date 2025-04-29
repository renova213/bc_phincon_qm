import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import todoService from "../services/todo.service";

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  // Parse pagination parameters from query string
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  // Validate pagination parameters
  if (page < 1 || limit < 1) {
    res.status(400).json({
      status: "fail",
      message: "Page and limit must be positive integers",
    });
    return;
  }

  const result = await todoService.getAllTodos({ page, limit });

  res.status(200).json({
    status: "success",
    pagination: {
      page: result.page,
      limit: result.limit,
      totalItems: result.total,
      totalPages: result.totalPages,
    },
    data: result.data,
  });
});

export const getTodoById = asyncHandler(async (req: Request, res: Response) => {
  const todo = await todoService.getTodoById(req.params.id);

  if (!todo) {
    res.status(404).json({
      status: "fail",
      message: "No todo found with that ID",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: todo,
  });
});

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, status, priority, dueDate, tags } = req.body;

  if (!title) {
    res.status(400).json({
      status: "fail",
      message: "Please provide a title",
    });
    return;
  }

  const todoData = {
    title,
    description,
    status: status || "to do",
    priority: priority || "medium",
    dueDate: dueDate || undefined,
    tags: tags || [],
  };

  const todo = await todoService.createTodo(todoData);
  res.status(201).json({
    status: "success",
    data: todo,
  });
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const todoExists = await todoService.todoExists(req.params.id);

  if (!todoExists) {
    res.status(404).json({
      status: "fail",
      message: "No todo found with that ID",
    });
    return;
  }

  const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: updatedTodo,
  });
});

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const todoExists = await todoService.todoExists(req.params.id);

  if (!todoExists) {
    res.status(404).json({
      status: "fail",
      message: "No todo found with that ID",
    });
    return;
  }

  await todoService.deleteTodo(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const updateTodoStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body;

    if (
      !status ||
      !["to do", "in-progress", "done", "archived"].includes(status)
    ) {
      res.status(400).json({
        status: "fail",
        message:
          "Please provide a valid status (to do, in-progress, done, archived)",
      });
      return;
    }

    const todo = await todoService.updateTodoStatus(req.params.id, status);

    if (!todo) {
      res.status(404).json({
        status: "fail",
        message: "No todo found with that ID",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: todo,
    });
  }
);
