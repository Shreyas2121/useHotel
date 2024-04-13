import { BookingRoom } from "../models/bookingroom.model";

class RoomBookService {
  async createBooking(booking: any) {
    const newBooking = await BookingRoom.create(booking);

    if (!newBooking) {
      throw new Error("Booking not created.");
    }
  }

  async getRoomsAvailability(checIn: Date, checkOut: Date) {
    return await BookingRoom.find({
      $and: [{ checkIn: { $lte: checkOut } }, { checkOut: { $gte: checIn } }],
    });
  }

  async getBookingsByUserId(userId: string) {
    return await BookingRoom.find({ user: userId })
      .populate("user", "-password")
      .populate("selectedAddons")
      .populate("coupon");
  }

  async updateReview(id: string) {
    await this.isReviewed(id);

    await BookingRoom.findByIdAndUpdate(id, { reviewGiven: true });
  }

  async isReviewed(id: string) {
    const isReviewed = await BookingRoom.findOne({
      $and: [{ _id: id }, { reviewGiven: true }],
    });

    if (isReviewed) {
      throw new Error("Already reviewed.");
    }
  }

  async deleteBookingById(id: string) {
    await BookingRoom.findByIdAndDelete(id);
  }
}

export default new RoomBookService();
