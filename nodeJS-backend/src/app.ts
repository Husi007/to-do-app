import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { router } from "./routes";
import { errorHandler } from "./middlewares/error";
import { NoResourceFoundError404 } from "./centeralizedErrorHandler/notFound404";
import { ErrorConstants } from "./centeralizedErrorHandler/constants";

const app = express();

app.set("trust proxy", true);
app.use(json);
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);
app.use(router);
app.all("*", () => {
  throw new NoResourceFoundError404(ErrorConstants.PATH_NOT_FOUND);
});
app.use(errorHandler);

export { app };
