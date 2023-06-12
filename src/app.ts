import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const foundUserById = await User.findById(req.params.userId);
      return res.status(200).json(foundUserById);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { error, value } = UserValidator.create.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      const createdUser = await User.create(value);
      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
);

app.put(
  "/users/:userId",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { userId } = req.params;
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 400);
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...value },
        {
          returnDocument: "after",
        }
      );
      return res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { userId } = req.params;

      const deletedUser = await User.findOneAndDelete({ _id: userId });

      return res.status(200).json(deletedUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json(err.message);
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server has started on port ${configs.PORT}`);
});
