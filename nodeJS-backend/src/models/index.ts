import { User } from "./user";
import { Task } from "./task";

User.hasMany(Task, {
  onDelete: "CASCADE",
  foreignKey: "user_id",
  as: "Tasks",
});

Task.belongsTo(User, {
  onDelete: "CASCADE",
  foreignKey: "user_id",
  as: "User",
});

export { Task, User };
