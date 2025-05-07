import BodyParser from "body-parser";
import Cors from "cors";
import Express, { Application } from "express";
import CorsMiddleware from "./middlewares/cors.js";
import NotFoundMiddleware from "./middlewares/not.found.js";
import { AuthRoutes, CategoryRoutes, ProductRoutes } from "./routes/index.js";

const app: Application = Express();
const routes: Express.Router[] = [AuthRoutes, CategoryRoutes, ProductRoutes];

// Middleware
app.use(Cors(CorsMiddleware));
app.use(BodyParser.json());
app.use(Express.urlencoded({ extended: true }));

// Routes
app.get("/", (_req, res) => {
  res.json({ message: "Swagger belom buat" });
});

for (const route of routes) {
  app.use("/api", route);
}

// Error handling
app.use(NotFoundMiddleware);

export default app;
