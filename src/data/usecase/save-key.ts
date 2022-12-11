import type { SaveKey, SaveKeyInput } from "../../domain/usecase/save-key";
import type { KeyEntity } from "../../infra/db/postgreSQL/entities/key-postgresql-entity";
import type { GenerateKey } from "../protocols/generate-key";
import type { SaveKeyRepository } from "../protocols/save-key-repository";

export class DbSaveKey implements SaveKey {
  public constructor(
    private readonly saveKeyRepository: SaveKeyRepository,
    private readonly generateKey: GenerateKey
  ) {}

  public async save(data: SaveKeyInput): Promise<KeyEntity | void> {
    const key = this.generateKey.generate();
    return this.saveKeyRepository.save({
      key: key,
      userId: data.userId,
    });
  }
}
