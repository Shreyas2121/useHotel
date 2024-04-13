// JWT Authenticate
import { NextFunction, Response, Request, UserRequest } from "express";
import { verify } from "jsonwebtoken";
import userService from "../services/user.service";

export const authenticate = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");

    if (!token)
      return res.status(401).json({ status: 0, message: "Invalid token." });

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      id: string;
      email: string;
    };

    const userId = verified.id;

    const user = await userService.getUserById(userId);

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: 0, message: "Token has expired." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ status: 0, message: "Invalid token." });
    }
    res.status(401).json({ status: 0, message: error.message });
  }
};
