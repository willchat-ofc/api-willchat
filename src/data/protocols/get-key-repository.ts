import type { KeyEntity } from "../../infra/db/postgreSQL/entities/key-postgresql-entity";

export interface GetRepositoryInput {
  userId: string;
}

export interface GetKeyRepository {
  get: (data: GetRepositoryInput) => Promise<KeyEntity>;
}
