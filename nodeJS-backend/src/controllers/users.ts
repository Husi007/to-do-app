import userService from "../services/user";
import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../constants/httpsStatusCode";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.signUp(req.body);

      return res.status(httpStatusCodes.CREATED).send({
        token: result.token,
        username: result.username,
      });
    } catch (error) {
      return next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.signIn(req.body);

      return res.status(httpStatusCodes.OK).send({
        token: result.token,
        username: result.username,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
