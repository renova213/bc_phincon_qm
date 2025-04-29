import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
  updateTodoStatus,
} from "../controllers/todo.controller";

const router = express.Router();

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").get(getTodoById).put(updateTodo).delete(deleteTodo);
router.route("/:id/status").put(updateTodoStatus);

export default router;
