import BodyParser from "body-parser";
import Cors from "cors";
import Express from "express";
import { CorsMiddleware, NotFoundMiddleware } from "./middlewares/index.js";
import { CourseRoutes, ReviewRoutes, ReviewVoteRoutes, TryoutRoutes, AppRoutes, } from "./routes/index.js";
const app = Express();
const routes = [
    CourseRoutes,
    ReviewRoutes,
    TryoutRoutes,
    ReviewVoteRoutes,
    AppRoutes,
];
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
