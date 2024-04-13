import hallService from "../services/hall.service";
import { Request, Response } from "express";

import hallbookingService from "../services/hallbooking.service";

export const getHalls = async (req: Request, res: Response) => {
  try {
    const halls = await hallService.getAllHalls();
    res.status(200).json(halls);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getHallCategories = async (req: Request, res: Response) => {
  try {
    const categories = await hallService.getHallsCategory();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getHallsAvailability = async (req: Request, res: Response) => {
  try {
    const { bookingDate, category } = req.query;

    if (!bookingDate || !category) {
      throw new Error("Please provide date and category");
    }

    const hall = await hallbookingService.getHallsAvailability(
      new Date(bookingDate as string),
      category as string
    );

    if (!hall) {
      const hall = await hallService.getHallByCategory(category as string);
      res.status(200).json({ status: 1, data: hall });
    } else {
      res
        .status(401)
        .json({ status: 0, message: `Hall is not available for ${category}` });
    }
  } catch (error: any) {
    res.status(400).json({ status: 0, message: error.message });
  }
};
