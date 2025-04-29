"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = __importDefault(require("../models/todo.model"));
class TodoService {
    async getAllTodos(paginationOptions) {
        const filter = {};
        const page = paginationOptions?.page || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            todo_model_1.default.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            todo_model_1.default.countDocuments(filter),
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
    async getTodoById(id) {
        return todo_model_1.default.findById(id);
    }
    async createTodo(todoData) {
        return todo_model_1.default.create(todoData);
    }
    async updateTodo(id, todoData) {
        return todo_model_1.default.findByIdAndUpdate(id, todoData, {
            new: true,
            runValidators: true,
        });
    }
    async deleteTodo(id) {
        const result = await todo_model_1.default.findByIdAndDelete(id);
        return !!result;
    }
    async updateTodoStatus(id, status) {
        const todo = await todo_model_1.default.findById(id);
        if (!todo) {
            return null;
        }
        todo.status = status.toLowerCase();
        await todo.save();
        return todo;
    }
    async todoExists(id) {
        const todo = await todo_model_1.default.findById(id);
        return !!todo;
    }
}
exports.default = new TodoService();
