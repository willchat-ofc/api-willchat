import { KeyEntity } from "./../entities/key-postgresql-entity";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { MessagesEntity } from "../entities/message-postgresql-entity";
import { ChatEntity } from "../entities/chat-postgresql-entity";
config();

export const dataSource = new DataSource({
  type: "postgres",
  host: "motty.db.elephantsql.com",
  url: process.env.URL_DATABASE,
  port: 5432,
  synchronize: true,
  logging: false,
  entities: [KeyEntity, MessagesEntity, ChatEntity],
});
/* 
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been started");
  })
  .catch(() => {
    console.log("Error during Data Source initialization");
  });
 */
