require("dotenv").config();
import { app } from "./app";
import { BadRequestError400 } from "./centeralizedErrorHandler/badRequest400";
import { ErrorConstants } from "./centeralizedErrorHandler/constants";
import { SuccessMessages } from "./constants";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new BadRequestError400(ErrorConstants.JWT_KEY_NOT_DEFINED);
  }
  if (!process.env.DB_NAME) {
    throw new BadRequestError400(ErrorConstants.DB_NAME_NOT_DEFINED);
  }
  if (!process.env.DB_PASSWORD) {
    throw new BadRequestError400(ErrorConstants.DB_PSSWORD_NOT_DEFINED);
  }
  if (!process.env.DB_USERNAME) {
    throw new BadRequestError400(ErrorConstants.DB_USER_NAME_NOT_DEFINED);
  }
  if (!process.env.DB_HOST) {
    throw new BadRequestError400(ErrorConstants.DB_HOST_NOT_DEFINED);
  }
  if (!process.env.PORT) {
    throw new BadRequestError400(ErrorConstants.PORT_NOT_DEFINED);
  }

  try {
    app.listen(process.env.PORT, () => {
      console.log(SuccessMessages.SERVER_LISTENING);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
