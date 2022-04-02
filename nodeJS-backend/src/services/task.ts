import { Task, User } from "../models";
import { NoResourceFoundError404 } from "../centeralizedErrorHandler/notFound404";
import { Op } from "sequelize";
import {
  TaskCreationAttributes,
  TaskFilter,
  TaskUpdateAttributes,
} from "../interfaces";
import { ErrorConstants } from "../centeralizedErrorHandler/constants";

class TaskService {
  async createTask(reqBody: TaskCreationAttributes) {
    const { title, description, user_id } = reqBody;
    const existingUser = await User.findOne({
      where: {
        id: user_id,
      },
    });

    if (!existingUser) {
      throw new NoResourceFoundError404(ErrorConstants.USER_NOT_FOUND);
    }

    const task = await Task.create({
      title,
      description,
      user_id,
    });

    return { task };
  }

  async updateTask(
    data: TaskUpdateAttributes,
    task_id: number,
    user_id: number
  ) {
    const { title, description } = data;
    const existingUser = await User.findOne({
      where: {
        id: user_id,
      },
    });

    if (!existingUser) {
      throw new NoResourceFoundError404(ErrorConstants.USER_NOT_FOUND);
    }

    const task = await Task.findOne({
      where: {
        id: task_id,
        user_id,
      },
    });

    if (!task) {
      throw new NoResourceFoundError404(ErrorConstants.TASK_NOT_FOUND);
    }

    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    await task.save();

    return { task };
  }

  async deleteTask(user_id: number, task_id: number) {
    const existingUser = await User.findOne({
      where: {
        id: user_id,
      },
    });

    if (!existingUser) {
      throw new NoResourceFoundError404(ErrorConstants.TASK_NOT_FOUND);
    }

    const task = await Task.findOne({
      where: {
        id: task_id,
        user_id,
      },
    });

    if (!task) {
      throw new NoResourceFoundError404(ErrorConstants.TASK_NOT_FOUND);
    }

    await task.destroy();

    return;
  }

  async getTasks(taskFilter: TaskFilter) {
    const {
      id,
      page = 0,
      limit = 10,
      title,
      description,
      user_id,
    } = taskFilter;
    const offset = limit * page;
    const tasks = await Task.findAll({
      offset,
      limit,
      where: {
        user_id,
        ...(id && { id }),
        ...(title && {
          title: {
            [Op.iLike]: `%${title}%`,
          },
        }),
        ...(description && {
          description: {
            [Op.iLike]: `%${description}%`,
          },
        }),
      },
    });

    return { tasks };
  }

  async getTask(user_id: number, task_id: number) {
    const existingUser = await User.findOne({
      where: {
        id: user_id,
      },
    });

    if (!existingUser) {
      throw new NoResourceFoundError404(ErrorConstants.USER_NOT_FOUND);
    }

    const task = await Task.findOne({
      where: {
        id: task_id,
        user_id,
      },
    });

    if (!task) {
      throw new NoResourceFoundError404(ErrorConstants.TASK_NOT_FOUND);
    }

    return { task };
  }
}

export default new TaskService();
