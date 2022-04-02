import taskService from "../services/task";
import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../constants/httpsStatusCode";
import { UserPayload } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

class TaskController {
  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const reqBody = {
        user_id: req.currentUser!.id,
        ...req.body,
      };
      const result = await taskService.createTask(reqBody);

      return res.status(httpStatusCodes.CREATED).send(result.task);
    } catch (error) {
      return next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task_id = +req.params.task_id;
      const user_id = req.currentUser!.id;
      const result = await taskService.updateTask(req.body, task_id, user_id);

      return res.status(httpStatusCodes.OK).send(result.task);
    } catch (error) {
      return next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task_id = +req.params.task_id;
      const user_id = req.currentUser!.id;

      await taskService.deleteTask(user_id, task_id);

      return res.status(httpStatusCodes.OK).send({});
    } catch (error) {
      return next(error);
    }
  }

  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = { ...req.query, user_id: req.currentUser!.id };
      const result = await taskService.getTasks(filter);

      return res.status(200).send(result);
    } catch (error) {
      return next(error);
    }
  }

  async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task_id = +req.params.task_id;
      const user_id = req.currentUser!.id;
      const result = await taskService.getTask(user_id, task_id);

      return res.status(httpStatusCodes.OK).send(result.task);
    } catch (error) {
      return next(error);
    }
  }
}

export default new TaskController();
