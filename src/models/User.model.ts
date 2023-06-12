import { model, Schema } from "mongoose";

import { EGenders } from "../enums/user.enum";

const userSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
    min: [1, "Minimum age is 1"],
    max: [170, "Maximum age 170"],
  },
  gender: {
    type: String,
    enum: EGenders,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model("user", userSchema);
