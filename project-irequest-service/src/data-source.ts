import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, //default: false
    migrationsRun: false, //default: false
    logging: false, //default: false
    entities: [
        `${__dirname}/entities/**/*.{ts,js}`,
    ],
    migrations: [],
    subscribers: [],
});