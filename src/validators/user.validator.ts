import Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums/user.enum";

export class UserValidator {
  static firstName = Joi.string().max(40).min(3).trim();
  static age = Joi.number().min(1).max(150);
  static gender = Joi.valid(...Object.values(EGenders));
  static email = Joi.string().regex(regexConstants.EMAIL).trim().lowercase();
  static password = Joi.string().regex(regexConstants.PASSWORD).trim();

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
