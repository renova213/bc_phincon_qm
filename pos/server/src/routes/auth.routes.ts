import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { userExistValidator } from "../validators/user.validator.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  userExistValidator,
  AuthController.register
);
router.post("/login", loginValidator, AuthController.login);

export default router;
