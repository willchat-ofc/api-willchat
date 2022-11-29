import type { KeyEntity } from "../../infra/db/postgreSQL/entities/key-postgresql-entity";

export interface GetKeyInput {
  userId: string;
}

export interface GetKey {
  get: (data: GetKeyInput) => Promise<Array<KeyEntity>>;
}
