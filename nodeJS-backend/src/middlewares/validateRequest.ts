import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError422 } from "../centeralizedErrorHandler/requestValidation";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError422(errors.array());
  }

  return next();
};
