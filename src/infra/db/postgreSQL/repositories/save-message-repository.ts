import type {
  SaveMessageRepository,
  SaveMessageRepositoryInput,
} from "../../../../data/protocols/save-message-repository";
import { TypeormRepository } from "../../helper/repository";
import { KeyEntity } from "../entities/key-postgresql-entity";
import { MessagesEntity } from "../entities/message-postgresql-entity";

export class SaveMessagePostgreRepository
  extends TypeormRepository
  implements SaveMessageRepository
{
  public async save(data: SaveMessageRepositoryInput): Promise<MessagesEntity> {
    const key = await this.findKey(data.key);

    if (!key) return;

    return this.saveMessage({
      chat: key.chat,
      message: data.message,
      userId: data.userId,
      userName: data.userName,
    });
  }

  private async findKey(key: string) {
    const keyRepository = this.getRepository(KeyEntity);
    return keyRepository.findOne({
      where: {
        key,
      },
      relations: {
        chat: true,
      },
    });
  }

  private async saveMessage(data: MessagesEntity) {
    const messageRepository = this.getRepository(MessagesEntity);
    return messageRepository.save(data);
  }
}
