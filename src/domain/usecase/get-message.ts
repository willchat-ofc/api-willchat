import type { MessagesEntity } from "../../infra/db/postgreSQL/entities/message-postgresql-entity";

export interface GetMessageInput {
  key: string;
  offset?: number;
  limit?: number;
}

export interface GetMessage {
  get: (data: GetMessageInput) => Promise<Array<MessagesEntity>>;
}
