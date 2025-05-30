import dotenv from "dotenv";
const env = process.env.NODE_ENV ?? "dev";
dotenv.config({ path: `.env.${env}` });
const config = {
    username: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "lms_db",
    host: process.env.DB_HOST ?? "localhost",
    listenPort: process.env.LISTEN_PORT ?? 3000,
    port: process.env.DB_PORT ?? 3306,
    JWT_SECRET: process.env.JWT_SECRET ?? "",
    JWT_EXPIRE: process.env.JWT_EXPIRE ?? "24h",
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_seeders",
    logging: false,
    models: ["./src/models"],
};
export default config;
