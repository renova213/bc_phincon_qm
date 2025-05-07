import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";

dotenv.config();

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  logging: boolean | ((sql: string) => void);
}

interface Config {
  development: DbConfig;
  test: DbConfig;
  production: DbConfig;
  [key: string]: DbConfig;
}

const dbHost: string = process.env.DB_HOST || "localhost";
const dbName: string = process.env.DB_NAME || "product_db";
const dbUser: string = process.env.DB_USER || "root";
const dbPassword: string = process.env.DB_PASSWORD || "";
const dbPort: number = Number(process.env.DB_PORT) || 3306;

const dbSequalize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  logging: false,
});

const config: Config = {
  development: {
    username: dbName,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ecommerce_dev",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: console.log,
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ecommerce_test",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ecommerce_prod",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  },
};

export { config, dbSequalize };
