import type { MessagesEntity } from "../../infra/db/postgreSQL/entities/message-postgresql-entity";

export interface GetMessageRepositoryInput {
  key: string;
  limit?: number;
  offset?: number;
}

export interface GetMessageRepository {
  get: (data: GetMessageRepositoryInput) => Promise<Array<MessagesEntity>>;
}
