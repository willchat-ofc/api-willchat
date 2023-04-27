import type {
  DeleteMessage,
  DeleteMessageInput,
} from "../../domain/usecase/delete-message";
import type { DeleteMessageRepository } from "../protocols/delete-message-repository";

export class DbDeleteMessage implements DeleteMessage {
  public constructor(
    private readonly deleteMessageRepository: DeleteMessageRepository
  ) {}

  public async delete(data: DeleteMessageInput): Promise<void> {
    await this.deleteMessageRepository.delete(data);
  }
}
