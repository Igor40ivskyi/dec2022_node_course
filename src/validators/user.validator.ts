import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { EGenders } from "../enums/user.enum";

export class UserValidator {
  static firstName = Joi.string().min(3).max(40).trim();
  static age = Joi.number().min(0).max(155);
  static gender = Joi.valid(...Object.values(EGenders));
  static email = Joi.string().email().trim().lowercase();
  static password = Joi.string().regex(regexConstant.PASSWORD).trim();

  static create = Joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });
}
