import type { SaveKey, SaveKeyInput } from "../../../domain/usecase/save-key";
import type { GenerateKey } from "../../protocols/generate-key";
import type { SaveKeyRepository } from "../../protocols/save-key-repository";

export class DbSaveKey implements SaveKey {
  public constructor(
    private readonly saveKeyRepository: SaveKeyRepository,
    private readonly generateKey: GenerateKey
  ) {}

  public async save(data: SaveKeyInput): Promise<void> {
    const key = this.generateKey.generate();
    this.saveKeyRepository.save({
      key: key,
      userId: data.userId,
    });
  }
}
