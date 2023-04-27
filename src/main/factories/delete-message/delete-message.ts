import { DbDeleteMessage } from "../../../data/usecase/delete-message";
import { DeleteMessagePostgreRepository } from "../../../infra/db/postgreSQL/repositories/delete-message-repository";
import { DeleteMessageController } from "../../../presentation/controller/message/delete-message";
import { makeDeleteMessageValidation } from "./delete-message-validation";

export const makeDeleteMessageController = () => {
  const deleteMessageRepository = new DeleteMessagePostgreRepository();
  const dbDeleteMessage = new DbDeleteMessage(deleteMessageRepository);

  return new DeleteMessageController(
    makeDeleteMessageValidation(),
    dbDeleteMessage
  );
};
