import * as express from "express";
import { usersRouter } from "../routes/users";
import { taskRouter } from "./task";

const router = express.Router();

router.use("/api/users", usersRouter);
router.use("/api/tasks", taskRouter);

export { router };
