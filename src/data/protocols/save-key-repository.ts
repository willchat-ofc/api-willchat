import type { KeyEntity } from "../../infra/db/postgreSQL/entities/key-postgresql-entity";

export interface SaveKeyRepositoryInput {
  userId: string;
  key: string;
}

export interface SaveKeyRepository {
  save: (data: SaveKeyRepositoryInput) => Promise<KeyEntity>;
}
