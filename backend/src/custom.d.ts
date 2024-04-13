import { IUser } from "./models/user.model";
import { Request } from "express";

declare module "express" {
  interface UserRequest extends Request {
    user?: IUser;
  }
}
