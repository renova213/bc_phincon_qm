import { Sequelize } from "sequelize";
import { config } from "../config/database";

const env = process.env.NODE_ENV || "development";
const dbConfig = config.development;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
  }
);

export { Sequelize, sequelize };
