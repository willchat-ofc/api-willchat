import type {
  GetMessageRepository,
  GetMessageRepositoryInput,
} from "../../../../data/protocols/get-message-repository";
import { TypeormRepository } from "../../helper/repository";
import { KeyEntity } from "../entities/key-postgresql-entity";
import { MessagesEntity } from "../entities/message-postgresql-entity";

export class GetMessagePostgreRepository
  extends TypeormRepository
  implements GetMessageRepository
{
  public async get(
    data: GetMessageRepositoryInput
  ): Promise<Array<MessagesEntity>> {
    const keyRepository = this.getRepository(KeyEntity);
    const messageRepository = this.getRepository(MessagesEntity);

    const key = await keyRepository.findOne({
      where: {
        key: data.key,
      },
      relations: {
        chat: true,
      },
    });

    return messageRepository.find({
      where: {
        chat: key.chat,
      },
    });
  }
}
