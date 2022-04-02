import { body, param, query } from "express-validator";

export const ROUTE_VALIDATIONS = {
  BODY: {
    TITLE: body("title")
      .trim()
      .isLength({ max: 50, min: 4 })
      .notEmpty()
      .withMessage("Title must be of 4 and 500 characters length."),
    DESCRIPTION: body("description")
      .trim()
      .isLength({ max: 255, min: 4 })
      .notEmpty()
      .withMessage("Description must be of 4 and 255 characters length."),
    TASK_Id: param("task_id")
      .trim()
      .isNumeric()
      .withMessage("task_id must be a valid number."),
    USERNAME: body("username")
      .trim()
      .isLength({ max: 30, min: 4 })
      .notEmpty()
      .withMessage("Username must be of 4 and 30 characters length"),
    PASSWORD: body("password")
      .trim()
      .isLength({ max: 30, min: 4 })
      .notEmpty()
      .withMessage("Password must be of 4 and 30 characters length"),
    NAME: body("name")
      .trim()
      .isLength({ max: 30, min: 4 })
      .notEmpty()
      .withMessage("Name must be of 4 and 30 characters length"),
  },
  QUERY: {
    PAGE: query("page").isNumeric().withMessage("page must be a number."),
    LIMIT: query("limit").isNumeric().withMessage("limit must be a number."),
    Id: query("id").isNumeric().optional().withMessage("id must be a number."),
  },
};
