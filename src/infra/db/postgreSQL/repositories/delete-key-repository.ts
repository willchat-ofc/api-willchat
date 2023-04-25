import type { DeleteKeyRepository, DeleteKeyRepositoryInput } from "../../../../data/protocols/delete-key-repository";
import { TypeormRepository } from "../../helper/repository";
import { KeyEntity } from "../entities/key-postgresql-entity";

export class DeleteKeyPostgreRepository extends TypeormRepository implements DeleteKeyRepository {
    public async delete(data: DeleteKeyRepositoryInput): Promise<void> {
        const keyEntityRepository = this.getRepository(KeyEntity);
        await keyEntityRepository.delete({ 
            key: data.key,
            userId: data.accountId, 
        });
    }
}