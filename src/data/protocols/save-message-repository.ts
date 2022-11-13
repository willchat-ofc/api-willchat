import type { MessagesEntity } from "../../infra/db/postgreSQL/entities/message-postgresql-entity";

export interface SaveMessageRepositoryInput {
  key: string;
  message: string;
  userName: string;
  userId: string;
}

export interface SaveMessageRepository {
  save: (data: SaveMessageRepositoryInput) => Promise<MessagesEntity>;
}
