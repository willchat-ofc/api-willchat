import type { DataSourceOptions } from "typeorm";
import { config } from "dotenv";
config();

export const configElephant = {
  type: "postgres",
  url: process.env.URL_DATABASE,
  port: 5432,
} as DataSourceOptions;
