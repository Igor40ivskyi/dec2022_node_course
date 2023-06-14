import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { UserValidator } from "../validators";

class UserMiddleware {
  public async isCreateValid(req: any, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.create.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      req.res.locals = value;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isupdateValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 400);
      }

      req.res.locals = value;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
