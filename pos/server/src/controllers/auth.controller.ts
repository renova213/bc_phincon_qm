import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      await AuthService.register(req);

      res
        .status(201)
        .json({ status: "success", message: "User created successfully" });
    } catch (error: any) {
      res.status(!error.message ? 500 : 400).json({
        message: error.message ?? "Internal Server Error",
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const { user, token } = await AuthService.login(username, password);

      const userData = {
        id: user.getDataValue("id"),
        username: user.getDataValue("username"),
        role: user.getDataValue("role"),
      };

      res.status(200).json({
        status: "success",
        data: {
          userData,
          accessToken: token,
        },
      });
    } catch (error: any) {
      res
        .status(!error.message ? 500 : 400)
        .json({ message: error.message ?? "Internal Server Error" });
    }
  }
}
