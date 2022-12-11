import type {
  SaveMessage,
  SaveMessageInput,
} from "../../domain/usecase/save-message";
import type { MessagesEntity } from "../../infra/db/postgreSQL/entities/message-postgresql-entity";
import type { SaveMessageRepository } from "../protocols/save-message-repository";

export class DbSaveMessage implements SaveMessage {
  public constructor(
    private readonly saveMessageRepository: SaveMessageRepository
  ) {}

  public async save(data: SaveMessageInput): Promise<MessagesEntity> {
    return this.saveMessageRepository.save(data);
  }
}
