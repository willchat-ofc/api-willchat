import type {
  GetKeyRepository,
  GetKeyRepositoryInput,
} from "../../../../data/protocols/get-key-repository";
import { TypeormRepository } from "../../helper/repository";
import { KeyEntity } from "../entities/key-postgresql-entity";

export class GetKeyPostgreRepository
  extends TypeormRepository
  implements GetKeyRepository
{
  public async get(data: GetKeyRepositoryInput): Promise<Array<KeyEntity>> {
    const keyRepository = this.getRepository(KeyEntity);
    const key = await keyRepository.find({
      where: {
        userId: data.userId,
      },
    });

    return key;
  }
}
