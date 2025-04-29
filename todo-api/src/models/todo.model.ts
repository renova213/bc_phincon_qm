import mongoose from "mongoose";
import { ITodoDocument } from "../interfaces/todo.interface";
import TodoSchema from "../schemas/todo.schema";

const TodoModel = mongoose.model<ITodoDocument>("Todo", TodoSchema);

export default TodoModel;
