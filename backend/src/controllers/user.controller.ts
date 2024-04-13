import userService from "../services/user.service";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    await userService.registerUser(req.body);
    res.status(201).json({ status: 1, message: "User registered." });
  } catch (error: any) {
    res.status(400).json({ status: 0, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await userService.loginUser(req.body);
    res.status(200).json({ status: 1, data: result });
  } catch (error: any) {
    res.status(400).json({ status: 0, message: error.message });
  }
};
