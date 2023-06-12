import { model, Schema } from "mongoose";

import { EGender } from "../enums/userGender.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: 1,
      max: 155,
    },
    gender: {
      type: String,
      enum: EGender,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("user", userSchema);
