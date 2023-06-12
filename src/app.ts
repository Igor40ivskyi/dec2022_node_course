import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const userById = await User.findById(req.params.userId);
      return res.status(200).json(userById);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const createdUser = await User.create(req.body);
      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.put(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { userId } = req.params;

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { returnDocument: "after" }
      );

      return res.status(201).json(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<void>> => {
    try {
      const { userId } = req.params;

      await User.deleteOne({ _id: userId });

      return res.status(200).json({
        message: "User deleted!",
      });
    } catch (e) {
      console.log(e);
    }
  }
);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on port ${configs.PORT}`);
});
