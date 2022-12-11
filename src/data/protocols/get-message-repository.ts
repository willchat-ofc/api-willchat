import type { MessagesEntity } from "../../infra/db/postgreSQL/entities/message-postgresql-entity";

export interface GetMessageRepositoryInput {
  key: string;
}

export interface GetMessageRepository {
  get: (data: GetMessageRepositoryInput) => Promise<Array<MessagesEntity>>;
}
