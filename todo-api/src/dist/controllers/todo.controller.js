"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoStatus = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoById = exports.getTodos = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const todo_service_1 = __importDefault(require("../services/todo.service"));
exports.getTodos = (0, express_async_handler_1.default)(async (req, res) => {
    // Parse pagination parameters from query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    // Validate pagination parameters
    if (page < 1 || limit < 1) {
        res.status(400).json({
            status: "fail",
            message: "Page and limit must be positive integers",
        });
        return;
    }
    const result = await todo_service_1.default.getAllTodos({ page, limit });
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
exports.getTodoById = (0, express_async_handler_1.default)(async (req, res) => {
    const todo = await todo_service_1.default.getTodoById(req.params.id);
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
exports.createTodo = (0, express_async_handler_1.default)(async (req, res) => {
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
    const todo = await todo_service_1.default.createTodo(todoData);
    res.status(201).json({
        status: "success",
        data: todo,
    });
});
exports.updateTodo = (0, express_async_handler_1.default)(async (req, res) => {
    const todoExists = await todo_service_1.default.todoExists(req.params.id);
    if (!todoExists) {
        res.status(404).json({
            status: "fail",
            message: "No todo found with that ID",
        });
        return;
    }
    const updatedTodo = await todo_service_1.default.updateTodo(req.params.id, req.body);
    res.status(200).json({
        status: "success",
        data: updatedTodo,
    });
});
exports.deleteTodo = (0, express_async_handler_1.default)(async (req, res) => {
    const todoExists = await todo_service_1.default.todoExists(req.params.id);
    if (!todoExists) {
        res.status(404).json({
            status: "fail",
            message: "No todo found with that ID",
        });
        return;
    }
    await todo_service_1.default.deleteTodo(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
exports.updateTodoStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const { status } = req.body;
    if (!status ||
        !["to do", "in-progress", "done", "archived"].includes(status)) {
        res.status(400).json({
            status: "fail",
            message: "Please provide a valid status (to do, in-progress, done, archived)",
        });
        return;
    }
    const todo = await todo_service_1.default.updateTodoStatus(req.params.id, status);
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
