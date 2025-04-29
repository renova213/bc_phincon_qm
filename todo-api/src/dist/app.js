"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cors_2 = __importDefault(require("./middleware/cors"));
const error_handler_1 = __importDefault(require("./middleware/error.handler"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)(cors_2.default));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/todos", todo_routes_1.default);
app.get("/", (_req, res) => {
    res.json({ message: "Welcome to Todo REST API" });
});
// Error handling
app.use(error_handler_1.default);
exports.default = app;
