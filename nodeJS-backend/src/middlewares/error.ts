import { Request, Response, NextFunction } from "express";
import { BaseError } from "../centeralizedErrorHandler/base";
import { ErrorConstants } from "../centeralizedErrorHandler/constants";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);
  return res.send({
    errors: [{ message: ErrorConstants.GENERIC_ERROR }],
  });
};
