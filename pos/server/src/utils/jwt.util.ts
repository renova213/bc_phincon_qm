import jwt from "jsonwebtoken";
import config from "../configs/config.js";
import { UserModel } from "../types/user.type.js";

export const generateToken = (user: UserModel): string => {
  return jwt.sign(
    {
      id: user.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, config.JWT_SECRET);
};
