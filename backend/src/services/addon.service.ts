import { Addon } from "../models/addon.model";

class AddonService {
  async create(addon: Addon) {
    return await Addon.create(addon);
  }

  getAll() {
    return Addon.find();
  }
}

export default new AddonService();
