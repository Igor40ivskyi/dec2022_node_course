import { NextFunction, Request, Response } from "express";

import { User } from "../models/User.model";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
