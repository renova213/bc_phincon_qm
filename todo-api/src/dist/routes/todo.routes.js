"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controllers/todo.controller");
const router = express_1.default.Router();
router.route("/").get(todo_controller_1.getTodos).post(todo_controller_1.createTodo);
router.route("/:id").get(todo_controller_1.getTodoById).put(todo_controller_1.updateTodo).delete(todo_controller_1.deleteTodo);
router.route("/:id/status").put(todo_controller_1.updateTodoStatus);
exports.default = router;
