import { Sequelize } from "sequelize";
import { ErrorConstants } from "../centeralizedErrorHandler/constants";
import { CrossOrginCommunication505 } from "../centeralizedErrorHandler/crossOrginCommunication505";
import { SuccessMessages } from "../constants";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: "postgres",
    minifyAliases: true,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .sync()
  .then(() => {
    console.log(SuccessMessages.DATA_BASE_CONNECTION);
  })
  .catch(() => {
    throw new CrossOrginCommunication505(ErrorConstants.POSTGRES_DB_CONNECTION);
  });

export { sequelize };
