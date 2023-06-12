import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [{ name: "vasya", age: 31, status: true }];

app.get("/users", async (req: Request, res: Response):Promise<Response<IUser>> => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (e) {
    console.log(e);
  }
});

app.get("/users/:userId", (req: Request, res: Response) => {
  console.log(req.params);
  const { userId } = req.params;
  res.status(200).json(users[+userId]);
});

app.post("/users", (req: Request, res: Response) => {
  users.push(req.body);

  res.status(201).json({
    message: "User created!",
  });
});

app.put("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log(users);

  users[+userId] = req.body;

  console.log(users);

  res.status(201).json({
    message: "User updated!",
    data: users[+userId],
  });
});

app.delete("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  users.splice(+userId, 1);

  res.status(200).json({
    message: "User deleted!",
  });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server has started on port ${configs.PORT}`);
});
