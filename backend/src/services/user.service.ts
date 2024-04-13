import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

class UserService {
  async registerUser(user: any) {
    const userExists = await this.getUserByEmail(user.email);

    if (userExists) {
      throw new Error("User already exists.");
    }

    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
    });

    if (!newUser) {
      throw new Error("User not created.");
    }
  }

  async loginUser({ email, password }: { email: string; password: string }) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found.");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new Error("Invalid credentials.");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET!
    );

    return {
      token: accessToken,
      user: user.toObject({
        versionKey: false,
        transform: function (doc, ret) {
          delete ret.password;
          return ret;
        },
      }),
    };
  }

  getUserById = async (id: string) => {
    const user = await User.findById(id).select("-password");

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  };

  getUserByEmail = async (email: string) => {
    return await User.findOne({ email });
  };
}

export default new UserService();
