import express from "express";
import usersController from "../controllers/users";
import { validateAuthorization } from "../middlewares/validateAuthorization";
import { validateRequest } from "../middlewares/validateRequest";
import { ROUTE_VALIDATIONS } from "./validations";
const router = express.Router();

router.post(
  "/signup",
  [
    ROUTE_VALIDATIONS.BODY.NAME,
    ROUTE_VALIDATIONS.BODY.USERNAME,
    ROUTE_VALIDATIONS.BODY.PASSWORD,
  ],
  validateRequest,
  usersController.signUp
);

router.post(
  "/signin",
  [
    ROUTE_VALIDATIONS.BODY.NAME,
    ROUTE_VALIDATIONS.BODY.USERNAME,
    ROUTE_VALIDATIONS.BODY.PASSWORD,
  ],
  validateRequest,
  usersController.signIn
);

router.get("/getuser", validateAuthorization, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as usersRouter };
