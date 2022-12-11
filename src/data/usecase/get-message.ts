import type { GetMessageRepository } from "./../protocols/get-message-repository";
import type {
  GetMessage,
  GetMessageInput,
} from "../../domain/usecase/get-message";
import type { MessagesEntity } from "../../infra/db/postgreSQL/entities/message-postgresql-entity";

export class DbGetMessage implements GetMessage {
  public constructor(
    private readonly getMessageRepository: GetMessageRepository
  ) {}

  public async get(data: GetMessageInput): Promise<Array<MessagesEntity>> {
    return this.getMessageRepository.get(data);
  }
}
