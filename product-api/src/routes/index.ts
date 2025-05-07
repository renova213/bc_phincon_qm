import { Router } from "express";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the E-commerce API",
    endpoints: {
      categories: "/api/categories",
      products: "/api/products",
    },
  });
});

export default router;
