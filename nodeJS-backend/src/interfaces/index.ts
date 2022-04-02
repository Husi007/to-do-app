import { Optional } from "sequelize/types";

export interface UserPayload {
  username: string;
  id: number;
}

export interface TaskFilter {
  limit?: number;
  page?: number;
  id?: number;
  title?: string;
  description?: string;
  user_id: number;
}

export interface TaskUpdateAttributes {
  title?: string;
  description?: string;
}

export interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  user_id: number;
}

export interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id"> {}

export interface UserAttributes {
  id: number;
  name: string;
  username: string;
  password: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}
