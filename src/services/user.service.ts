import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return User.find();
  }

  public async create(data: IUser): Promise<IUser> {
    return User.create(data);
  }
}

export const userService = new UserService();
