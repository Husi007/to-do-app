import express from "express";
import taskController from "../controllers/tasks";
import { validateAuthorization } from "../middlewares/validateAuthorization";
import { validateRequest } from "../middlewares/validateRequest";
import { generateAuthorizationError } from "../middlewares/generateAuthorizationError";
import { ROUTE_VALIDATIONS } from "./validations";

const router = express.Router();

router.post(
  "/",
  validateAuthorization,
  generateAuthorizationError,
  [ROUTE_VALIDATIONS.BODY.TITLE, ROUTE_VALIDATIONS.BODY.DESCRIPTION],
  validateRequest,
  taskController.createTask
);

router.put(
  "/:task_id",
  validateAuthorization,
  generateAuthorizationError,
  [
    ROUTE_VALIDATIONS.BODY.TITLE,
    ROUTE_VALIDATIONS.BODY.DESCRIPTION,
    ROUTE_VALIDATIONS.BODY.TASK_Id,
  ],
  validateRequest,
  taskController.updateTask
);

router.delete(
  "/:task_id",
  validateAuthorization,
  generateAuthorizationError,
  [ROUTE_VALIDATIONS.BODY.TASK_Id],
  validateRequest,
  taskController.deleteTask
);

router.get(
  "/",
  validateAuthorization,
  generateAuthorizationError,
  [
    ROUTE_VALIDATIONS.QUERY.PAGE,
    ROUTE_VALIDATIONS.QUERY.LIMIT,
    ROUTE_VALIDATIONS.QUERY.Id,
    ROUTE_VALIDATIONS.BODY.TITLE,
    ROUTE_VALIDATIONS.BODY.DESCRIPTION,
  ],
  taskController.getTasks
);

router.get(
  "/:task_id",
  validateAuthorization,
  generateAuthorizationError,
  [ROUTE_VALIDATIONS.BODY.TASK_Id],
  taskController.getTask
);

export { router as taskRouter };
