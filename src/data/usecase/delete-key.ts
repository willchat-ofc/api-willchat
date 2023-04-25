import type { DeleteKey, DeleteKeyInput } from "../../domain/usecase/delete-key";
import type { DeleteKeyRepository } from "../protocols/delete-key-repository";

export class DbDeleteKey implements DeleteKey {
    public constructor(private readonly deleteKeyRepository: DeleteKeyRepository) {}

    public async delete(data: DeleteKeyInput): Promise<void> {
        return this.deleteKeyRepository.delete(data);
    } 
}