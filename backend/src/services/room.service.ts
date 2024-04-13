import { Room } from "../models/room.model";

class RoomService {
  async createRoom(room: any) {
    const newRoom = await Room.create(room);

    if (!newRoom) {
      throw new Error("Room not created.");
    }
  }

  async getAllRooms() {
    return await Room.find();
  }

  async getRoomsCategory() {
    return await Room.find().distinct("category");
  }
}

export default new RoomService();
