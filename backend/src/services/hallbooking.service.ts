import { BookingHall } from "../models/bookinghall.model";

class HallBookService {
  async createBooking(booking: any) {
    const newBooking = await BookingHall.create(booking);

    if (!newBooking) {
      throw new Error("Booking not created.");
    }
  }

  async getHallsAvailability(bookedDate: Date, category: string) {
    return await BookingHall.findOne({
      $and: [
        { bookedDate: { $eq: bookedDate } },
        { category: { $eq: category } },
      ],
    });
  }

  async getBookingsByUserId(userId: string) {
    return await BookingHall.find({ user: userId })
      .populate("user", "-password")
      .populate("selectedAddons")
      .populate("coupon");
  }

  async updateReview(id: string) {
    await this.isReviewed(id);

    await BookingHall.findByIdAndUpdate(id, { reviewGiven: true });
  }

  async isReviewed(id: string) {
    const isReviewed = await BookingHall.findOne({
      $and: [{ _id: id }, { reviewGiven: true }],
    });

    if (isReviewed) {
      throw new Error("Already reviewed.");
    }
  }

  async deleteBookingById(id: string) {
    await BookingHall.findByIdAndDelete(id);
  }
}

export default new HallBookService();
