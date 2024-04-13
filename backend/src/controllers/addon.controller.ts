import addonService from "../services/addon.service";
import { Request, Response } from "express";

export const createAddon = async (req: Request, res: Response) => {
  const addon = await addonService.create(req.body);
  res.status(201).json(addon);
};

export const getAllAddons = async (req: Request, res: Response) => {
  const addons = await addonService.getAll();
  res.status(200).json(addons);
};
