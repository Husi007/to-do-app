import { Request, Response, NextFunction } from "express";
import { ErrorConstants } from "../centeralizedErrorHandler/constants";
import { UnAuthorizedError401 } from "../centeralizedErrorHandler/unAuthorize401";
import { UserPayload } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const generateAuthorizationError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new UnAuthorizedError401(ErrorConstants.UN_AUTHORIZED_USER);
  }

  return next();
};
