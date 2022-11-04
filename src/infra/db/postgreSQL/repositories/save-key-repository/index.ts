import { ChatEntity } from "./../../entities/chat-postgresql-entity";
import type {
  SaveKeyRepository,
  SaveKeyRepositoryInput,
} from "./../../../../../data/protocols/save-key-repository";
import postgreHelper from "../../helper/postgre-helper";
import { KeyEntity } from "../../entities/key-postgresql-entity";

export class SaveKeyPostgreRepository implements SaveKeyRepository {
  public async save(data: SaveKeyRepositoryInput): Promise<void> {
    const chatRepository = await postgreHelper.getRepository(ChatEntity);
    const chat = new ChatEntity();
    await chatRepository.save(chat);

    const keyRepository = await postgreHelper.getRepository(KeyEntity);
    const key = new KeyEntity();
    key.chat = chat;
    key.userId = data.userId;
    key.key = data.key;

    await keyRepository.save(key);
  }
}
