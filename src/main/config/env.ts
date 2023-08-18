/* eslint-disable @typescript-eslint/no-magic-numbers */
import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || "secret_jwt",
  key: process.env.KEY,
  cert: process.env.CERT,
};
