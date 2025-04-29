"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todo_schema_1 = __importDefault(require("../schemas/todo.schema"));
const TodoModel = mongoose_1.default.model("Todo", todo_schema_1.default);
exports.default = TodoModel;
