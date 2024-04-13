import { Hall } from "../models/hall.model";

class HallService {
  async createHall(hall: any) {
    const newHall = await Hall.create(hall);

    if (!newHall) {
      throw new Error("Hall not created.");
    }
  }

  async getAllHalls() {
    return await Hall.find();
  }

  async getHallsCategory() {
    return await Hall.find().distinct("category");
  }

  async getHallByCategory(category: string) {
    return await Hall.findOne({ category });
  }
}

export default new HallService();
