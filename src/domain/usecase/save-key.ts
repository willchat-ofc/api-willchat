import type { KeyEntity } from "../../infra/db/postgreSQL/entities/key-postgresql-entity";

export interface SaveKeyInput {
  userId: string;
}

export interface SaveKey {
  save: (data: SaveKeyInput) => Promise<KeyEntity | void>;
}
