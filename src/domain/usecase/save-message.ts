import type { MessagesEntity } from "../../infra/db/postgreSQL/entities/message-postgresql-entity";

export interface SaveMessageInput {
  key: string;
  message: string;
  userName: string;
  userId: string;
}

export interface SaveMessage {
  save: (data: SaveMessageInput) => Promise<MessagesEntity>;
}
