import { ChatEntity } from "./../../entities/chat-postgresql-entity";
import type {
  SaveKeyRepository,
  SaveKeyRepositoryInput,
} from "./../../../../../data/protocols/save-key-repository";
import { KeyEntity } from "../../entities/key-postgresql-entity";
import { TypeormRepository } from "../../../helper/repository";

export class SaveKeyTypeormRepository
  extends TypeormRepository
  implements SaveKeyRepository
{
  public async save(data: SaveKeyRepositoryInput): Promise<void> {
    const chatRepository = this.getRepository(ChatEntity);
    const chat = new ChatEntity();
    await chatRepository.save(chat);

    const keyRepository = this.getRepository(KeyEntity);
    const key = new KeyEntity();
    key.chat = chat;
    key.userId = data.userId;
    key.key = data.key;

    await keyRepository.save(key);
  }
}
