import HallbookingService from "../services/hallbooking.service";
import { Response, Request, UserRequest } from "express";

export const createBooking = async (req: Request, res: Response) => {
  try {
    await HallbookingService.createBooking(req.body);
    res.status(201).json({ message: "Booking created successfully." });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBookingByUser = async (req: UserRequest, res: Response) => {
  try {
    const id = req?.user?.id;

    const bookings = await HallbookingService.getBookingsByUserId(id);

    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHallBooking = async (req: UserRequest, res: Response) => {
  try {
    const id = req.params.id;

    await HallbookingService.deleteBookingById(id);

    res.status(200).json({ message: "Booking Deleted successfully." });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
