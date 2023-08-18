import type {
  DeleteMessageRepository,
  DeleteMessageRepositoryInput,
} from "../../../../data/protocols/delete-message-repository";
import { TypeormRepository } from "../../helper/repository";
import { KeyEntity } from "../entities/key-postgresql-entity";
import { MessagesEntity } from "../entities/message-postgresql-entity";

export class DeleteMessagePostgreRepository
  extends TypeormRepository
  implements DeleteMessageRepository
{
  public async delete(data: DeleteMessageRepositoryInput): Promise<void> {
    const messageRepository = this.getRepository(MessagesEntity);

    const keyRepository = this.getRepository(KeyEntity);
    const key = await keyRepository.findOne({
      where: {
        key: data.key,
        userId: data.accountId,
      },
      relations: ["chat"],
    });

    await messageRepository
      .createQueryBuilder("messages")
      .leftJoinAndSelect("messages.chat", "chat", "chat = :id", {
        id: key.chat.id,
      })
      .where("messages.id = :id", { id: data.messageId })
      .delete()
      .execute()
      .catch((res) => {
        console.log(res);
      });
  }
}
