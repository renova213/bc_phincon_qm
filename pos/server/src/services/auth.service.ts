import bcrypt from "bcrypt";
import { Request } from "express";
import UserModel from "../models/user.model.js";
import { generateToken } from "../utils/jwt.util.js";

export class AuthService {
  static async register(req: Request): Promise<{ user: Object }> {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await UserModel.create({
      username,
      password: hashedPassword,
      role,
    });

    return { user };
  }

  static async login(
    username: string,
    password: string
  ): Promise<{ user: any; token: string }> {
    let user = await UserModel.findOne({
      where: { username },
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude fields
    });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isMatch: boolean = await bcrypt.compare(
      password,
      user.getDataValue("password")
    );
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    const token = generateToken(user.dataValues);

    if (!token) {
      throw new Error("Failed to generate token");
    }

    return { user, token };
  }
}
