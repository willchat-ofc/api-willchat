import { ChatEntity } from "../entities/chat-postgresql-entity";
import type {
  SaveKeyRepository,
  SaveKeyRepositoryInput,
} from "../../../../data/protocols/save-key-repository";
import { KeyEntity } from "../entities/key-postgresql-entity";
import { TypeormRepository } from "../../helper/repository";

export class SaveKeyPostgreRepository
  extends TypeormRepository
  implements SaveKeyRepository
{
  public async save(data: SaveKeyRepositoryInput): Promise<KeyEntity> {
    const chatRepository = this.getRepository(ChatEntity);
    const chat = new ChatEntity();

    const keyRepository = this.getRepository(KeyEntity);

    const key = new KeyEntity();
    key.chat = chat;
    key.userId = data.userId;
    key.key = data.key;

    await chatRepository.save(chat);
    const keyEntity = await keyRepository.save(key);

    return keyEntity;
  }
}
