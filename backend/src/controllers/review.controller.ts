import reviewService from "../services/review.service";

import { Request, Response, UserRequest } from "express";
import roombookingService from "../services/roombooking.service";

export const postReview = async (req: UserRequest, res: Response) => {
  try {
    const { reviewBy, bookingId, rating, comment } = req.body;

    if (!reviewBy || !bookingId || !rating || !comment) {
      return res.status(400).json({ status: 0, message: "Invalid data." });
    }

    await roombookingService.updateReview(bookingId);

    await reviewService.createReview({
      reviewBy,
      roomBookingId: bookingId,
      rating,
      comment,
    });

    res.status(200).json({
      status: 1,
      message: "Review created successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: 0, message: error.message });
  }
};

export const getTopReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getTopReviews();
    res.status(200).json({ status: 1, data: reviews });
  } catch (error: any) {
    res.status(400).json({ status: 0, message: error.message });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getReviews();
    res.status(200).json({ status: 1, data: reviews });
  } catch (error: any) {
    res.status(400).json({ status: 0, message: error.message });
  }
};
