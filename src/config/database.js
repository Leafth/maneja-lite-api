import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.db",
  logging: false,
});

export default sequelize;
