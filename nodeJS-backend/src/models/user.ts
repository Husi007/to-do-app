import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";
import { Password } from "../services/password";
import { UserAttributes, UserCreationAttributes } from "../interfaces";

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    sequelize,
  }
);

User.beforeCreate(async (user) => {
  user.password = await Password.toHash(user.password);
});

export { User };
