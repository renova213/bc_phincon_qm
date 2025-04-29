import cors from "cors";
import express, { Application } from "express";
import corsMiddleware from "./middleware/cors";
import errorHandler from "./middleware/error.handler";
import todoRoutes from "./routes/todo.routes";

const app: Application = express();

// Middleware
app.use(cors(corsMiddleware));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/todos", todoRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Todo REST API" });
});

// Error handling
app.use(errorHandler);

export default app;
