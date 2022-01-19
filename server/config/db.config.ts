import { Options } from "sequelize/dist";

const config: Options = {
  host: "localhost",
  username: process.env.PG_USER || "kuku",
  password: process.env.PG_PASSWORD || "kuku0725",
  database: process.env.PG_DATABASE || "today_kudb",
  dialect: "postgres",
  timezone: "+09:00",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default config;
