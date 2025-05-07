import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../validators/product.validator.js";

const router = Router();

router.post("/product", validateCreateProduct, ProductController.createProduct);
router.get("/product", ProductController.getAllProducts);
router.get("/product/:id", ProductController.getProduct);
router.put(
  "/product/:id",
  validateUpdateProduct,
  ProductController.updateProduct
);
router.delete("/product/:id", ProductController.deleteProduct);
router.get(
  "/product/category/:categoryId",
  ProductController.getProductsByCategory
);

export default router;
