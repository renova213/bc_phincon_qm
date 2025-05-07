import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import {
  validateCreateCategory,
  validateUpdateCategory,
} from "../validators/category.validator.js";

const router = Router();

router.post(
  "/category",
  validateCreateCategory,
  CategoryController.createCategory
);
router.get("/category", CategoryController.getAllCategories);
router.get("/category/:id", CategoryController.getCategory);
router.put(
  "/category/:id",
  validateUpdateCategory,
  CategoryController.updateCategory
);
router.delete("/category/:id", CategoryController.deleteCategory);

export default router;
