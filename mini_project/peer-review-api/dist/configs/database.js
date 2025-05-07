import { Sequelize } from "sequelize";
import config from "./config.js";
const sequelize = new Sequelize({
    dialect: config.dialect,
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
});
export default sequelize;
