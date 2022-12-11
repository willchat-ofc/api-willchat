import type { GetKey, GetKeyInput } from "../../domain/usecase/get-key";
import type { KeyEntity } from "../../infra/db/postgreSQL/entities/key-postgresql-entity";
import type { GetKeyRepository } from "../protocols/get-key-repository";

export class DbGetKey implements GetKey {
  public constructor(private readonly getKeyRepository: GetKeyRepository) {}

  public async get(data: GetKeyInput): Promise<Array<KeyEntity>> {
    return this.getKeyRepository.get(data);
  }
}
