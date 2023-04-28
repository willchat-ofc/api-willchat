import type { KeyEntity } from "../../infra/db/postgreSQL/entities/key-postgresql-entity";

export interface GetKeyRepositoryInput {
  userId: string;
}

export interface GetKeyRepository {
  get: (data: GetKeyRepositoryInput) => Promise<Array<KeyEntity>>;
}
