import roomService from "../services/room.service";
import { Request, Response } from "express";
import bookingService from "../services/roombooking.service";

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json(rooms);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoomsAvailability = async (req: Request, res: Response) => {
  try {
    const { checkIn, checkOut } = req.body;

    const rooms = await roomService.getAllRooms();

    // const roomsCategory = await roomService.getRoomsCategory();

    const roomCategoryCount: Record<string, number> = rooms.reduce(
      (counts: Record<string, number>, room) => {
        counts[room.category] = room.total_rooms;
        return counts;
      },
      {}
    );

    const bookings = await bookingService.getRoomsAvailability(
      new Date(checkIn as string),
      new Date(checkOut as string)
    );

    const bookedRoomCounts: Record<string, number> = bookings.reduce(
      (counts: Record<string, number>, booking) => {
        counts[booking.category] = (counts[booking.category] || 0) + 1;
        return counts;
      },
      {}
    );

    const availableRooms: Record<string, number> = Object.keys(
      roomCategoryCount
    ).reduce((counts: Record<string, number>, category) => {
      counts[category] =
        roomCategoryCount[category] - (bookedRoomCounts[category] || 0);
      return counts;
    }, {});

    res.status(200).json(availableRooms);
  } catch (error: any) {
    res.status(400).json({ status: 0, message: error.message });
  }
};
